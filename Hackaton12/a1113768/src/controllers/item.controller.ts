import type { NextFunction, Request, Response } from "express";
import Item from "../models/Item.ts";
import { appError } from "../middlewares/errorHandler.ts";
import { getPagination, paginatedResponse } from "../utils/pagination.ts";

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return next(appError(400, "MISSING_FIELDS", "faltan parametros"));
    }

    console.log("RequesT: ", req.userId);
    const newItem = await Item.create({
      nombre,
      descripcion,
      usuario: req.userId,
    });

    res.status(200).json({ status: "ok", data: newItem });
  } catch (error) {
    next(error);
  }
};

export const getListOfItemsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, pageSize, limit, offset } = getPagination(req.query);

    const [rows, count] = await Promise.all([
      Item.find({ usuario: req.userId })
        .sort({ fecha: -1 })
        .skip(offset)
        .limit(limit),
      Item.countDocuments({ usuario: req.userId }),
    ]);

    res.status(200).json({
      status: "ok",
      ...paginatedResponse({ rows, count }, page, pageSize),
    });
  } catch (error) {
    next(error);
  }
};

export const updateItemOfUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nombre, descripcion } = req.body;
    const { itemId } = req.query;

    // console.log("itemId: ", itemId);

    const findItem = await Item.findOne({ _id: itemId, usuario: req.userId });

    if (!findItem) {
      return next(appError(400, "MISSING_ITEM", "El item no existe!"));
    }

    findItem.nombre = nombre;
    findItem.descripcion = descripcion;

    findItem.save();

    res
      .status(200)
      .json({ status: "ok", msg: "El item fue actualziado", data: findItem });
  } catch (error) {
    next(error);
  }
};

export const updateStateItemOfUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { state } = req.body;
    const { itemId } = req.query;

    // console.log("itemId: ", itemId);

    const findItem = await Item.findOne({ _id: itemId, usuario: req.userId });

    if (!findItem) {
      return next(appError(400, "MISSING_ITEM", "El item no existe!"));
    }

    findItem.esCompletado = state;

    findItem.save();

    res.status(200).json({
      status: "ok",
      msg: "El estado del item fue actualizado !",
      data: findItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItemOfUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.query;

    // console.log("itemId: ", itemId);

    await Item.findOneAndDelete({ _id: itemId, usuario: req.userId });

    res.status(200).json({ status: "ok", msg: "El item fue eliminado" });
  } catch (error) {
    next(error);
  }
};

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, pageSize, limit, offset } = getPagination(req.query);

    const [rows, count] = await Promise.all([
      Item.find().sort({ fecha: -1 }).skip(offset).limit(limit),
      Item.countDocuments(),
    ]);

    res.status(200).json({
      status: "ok",
      ...paginatedResponse({ rows, count }, page, pageSize),
    });
  } catch (error) {
    next(error);
  }
};
