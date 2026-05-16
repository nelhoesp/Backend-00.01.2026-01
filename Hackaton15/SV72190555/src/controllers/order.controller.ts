import type { NextFunction, Request, Response } from "express";
import { Order } from "../models/Order.ts";
import { appError } from "../middlewares/errorHandler.ts";
import User from "../models/User.ts";

export const findAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.findAll();
    if (!orders) {
      return next(appError(400, "ORDERS_NOT_FOUND", "faltan parametros"));
    }
    return res.status(200).json({ status: "ok", data: orders });
  } catch (error) {
    next(error);
  }
};

export const findOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.query;
    // if (!id) {
    //   return next(appError(400, "MISSING ORDER ID", "faltan parametros"));
    // }

    const orders = await Order.findByPk(id as string);

    if (!orders) {
      return next(appError(400, "ORDERS_NOT_FOUND", "faltan parametros"));
    }
    return res.status(200).json({ status: "ok", data: orders });
  } catch (error) {
    next(error);
  }
};

export const findOrderByClient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const client_id = req.userId;

    const orders = await Order.findOne({ where: { client_id: req.userId } });

    if (!orders) {
      return next(appError(400, "ORDERS_NOT_FOUND", "faltan parametros"));
    }
    return res.status(200).json({ status: "ok", data: orders });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const client_id = req.userId;
    const { origin_address, dest_address, description, weight_kg, status } =
      req.body;

    const orders = await Order.create({
      client_id,
      tracking_code: tracking(),
      origin_address,
      dest_address,
      description,
      weight_kg,
      status,
    });

    return res.status(200).json({ status: "ok", data: orders });
  } catch (error) {
    next(error);
  }
};

export const assignCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { order_id, courier_id } = req.body;

    const validCourier = await User.findById(courier_id);

    if (!validCourier) {
      return next(
        appError(400, "COURIER_NOT_FOUND", "el courier no fue encontrado"),
      );
    }

    if (validCourier.role !== "courier") {
      return next(
        appError(400, "COURIER_NOT_VALID", "el courier no es valido"),
      );
    }

    await Order.update(
      { courier_id, status: "assigned" },
      { where: { id: order_id } },
    );

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export function tracking(): string {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    "CR" +
    Array.from(
      { length: 8 },
      () => c[Math.floor(Math.random() * c.length)],
    ).join("")
  );
}
// export const findAllOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {

//     return res.status(200).json({ status: "ok", allUsers });
//   } catch (error) {
//     next(error);
//   }
// };
