import type { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product.ts";
import { appError } from "../middlewares/errorHandler.ts";

export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ status: "ok", data: products });
  } catch (error) {
    next(error);
  }
};

export const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return next(appError(404, "PRODUCT_NOT_FOUND", "Producto no encontrado"));
    }

    return res.status(200).json({ status: "ok", data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nombre, descripcion, precio, stock, imagen } = req.body;

    const product = await Product.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen: imagen ?? null,
    });

    return res.status(201).json({ status: "ok", data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return next(appError(404, "PRODUCT_NOT_FOUND", "Producto no encontrado"));
    }

    await product.update({ nombre, descripcion, precio, stock, imagen });

    return res.status(200).json({ status: "ok", data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return next(appError(404, "PRODUCT_NOT_FOUND", "Producto no encontrado"));
    }

    await product.destroy();

    return res.status(200).json({ status: "ok", msg: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
};
