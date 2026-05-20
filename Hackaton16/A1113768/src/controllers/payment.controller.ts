import type { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import { Payment } from "../models/Payment.ts";
import { Refund } from "../models/Refund.ts";
import { PurchaseItem } from "../models/PurchaseItem.ts";
import { Product } from "../models/Product.ts";
import { appError } from "../middlewares/errorHandler.ts";
import { io } from "../socket.ts";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Crear intención de pago con Stripe
export const createPaymentIntent = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { items } = req.body;
    // items: [{ product_id, quantity }]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(appError(400, "ITEMS_REQUIRED", "Se requieren productos"));
    }

    // Calcular total y validar stock
    let total = 0;
    const itemsDetail = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return next(
          appError(404, "PRODUCT_NOT_FOUND", `Producto ${item.product_id} no encontrado`),
        );
      }
      if (product.stock < item.quantity) {
        return next(
          appError(400, "INSUFFICIENT_STOCK", `Stock insuficiente para ${product.nombre}`),
        );
      }
      total += Number(product.precio) * item.quantity;
      itemsDetail.push({ product, quantity: item.quantity });
    }

    // Crear PaymentIntent en Stripe (monto en centavos)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      metadata: { user_id: req.userId.toString() },
    });

    // Guardar pago en BD con estado pending
    const payment = await Payment.create({
      user_id: req.userId.toString(),
      amount: total,
      currency: "usd",
      status: "pending",
      stripe_payment_intent_id: paymentIntent.id,
      metadata: JSON.stringify(items),
    });

    // Guardar items comprados
    for (const { product, quantity } of itemsDetail) {
      await PurchaseItem.create({
        payment_id: payment.id,
        product_id: product.id,
        quantity,
        unit_price: product.precio,
      });
    }

    return res.status(200).json({
      status: "ok",
      data: {
        payment_id: payment.id,
        client_secret: paymentIntent.client_secret,
        amount: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Confirmar pago (webhook o confirmación manual)
export const confirmPayment = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { payment_id } = req.body;

    const payment = await Payment.findByPk(payment_id);

    if (!payment) {
      return next(appError(404, "PAYMENT_NOT_FOUND", "Pago no encontrado"));
    }

    if (payment.user_id !== req.userId.toString()) {
      return next(appError(403, "FORBIDDEN", "No autorizado"));
    }

    // Verificar con Stripe
    if (payment.stripe_payment_intent_id) {
      const intent = await stripe.paymentIntents.retrieve(
        payment.stripe_payment_intent_id,
      );

      if (intent.status === "succeeded") {
        await payment.update({ status: "paid" });

        // Descontar stock
        const purchaseItems = await PurchaseItem.findAll({
          where: { payment_id: payment.id },
        });

        for (const item of purchaseItems) {
          const product = await Product.findByPk(item.product_id);
          if (product) {
            await product.update({ stock: product.stock - item.quantity });
          }
        }

        // Notificar por Socket.io
        io.emit("payment:update", {
          payment_id: payment.id,
          status: "paid",
          user_id: payment.user_id,
        });
      }
    }

    return res.status(200).json({ status: "ok", data: payment });
  } catch (error) {
    next(error);
  }
};

// Obtener todos los pagos del usuario logueado
export const getMyPayments = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await Payment.findAll({
      where: { user_id: req.userId.toString() },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({ status: "ok", data: payments });
  } catch (error) {
    next(error);
  }
};

// Obtener todos los pagos (solo admin)
export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await Payment.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({ status: "ok", data: payments });
  } catch (error) {
    next(error);
  }
};

// Solicitar devolución (refund)
export const requestRefund = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { payment_id, reason } = req.body;

    const payment = await Payment.findByPk(payment_id);

    if (!payment) {
      return next(appError(404, "PAYMENT_NOT_FOUND", "Pago no encontrado"));
    }

    if (payment.user_id !== req.userId.toString()) {
      return next(appError(403, "FORBIDDEN", "No autorizado"));
    }

    if (payment.status !== "paid") {
      return next(
        appError(400, "PAYMENT_NOT_PAID", "Solo se pueden devolver pagos confirmados"),
      );
    }

    // Procesar refund en Stripe
    let stripeRefundId = null;

    if (payment.stripe_payment_intent_id) {
      const stripeRefund = await stripe.refunds.create({
        payment_intent: payment.stripe_payment_intent_id,
      });
      stripeRefundId = stripeRefund.id;
    }

    // Guardar devolución en BD
    const refund = await Refund.create({
      payment_id: payment.id,
      amount: payment.amount,
      reason: reason ?? "Solicitud del cliente",
      stripe_refund_id: stripeRefundId,
      status: "processed",
    });

    // Actualizar estado del pago
    await payment.update({ status: "refunded" });

    // Notificar por Socket.io
    io.emit("payment:update", {
      payment_id: payment.id,
      status: "refunded",
      user_id: payment.user_id,
    });

    return res.status(200).json({ status: "ok", data: refund });
  } catch (error) {
    next(error);
  }
};

// Historial de devoluciones del usuario
export const getMyRefunds = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await Payment.findAll({
      where: { user_id: req.userId.toString() },
      attributes: ["id"],
    });

    const paymentIds = payments.map((p) => p.id);

    const refunds = await Refund.findAll({
      where: { payment_id: paymentIds },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({ status: "ok", data: refunds });
  } catch (error) {
    next(error);
  }
};
