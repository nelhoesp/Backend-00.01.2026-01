import type { NextFunction, Request, Response } from "express";
import Item from "../models/Item.ts";
import { appError } from "../middlewares/errorHandler.ts";
import { getPagination, paginatedResponse } from "../utils/pagination.ts";
import axios from "axios";

export const improveDescription = async (
  description: string,
): Promise<string> => {
  try {
    const prompt = `
      Corrige este texto y responde SOLO con el texto corregido, sin explicaciones ni comillas: "${description}"
    `;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2", // o "llama3", "llama2", etc.
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        max_tokens: 200,
      },
    });

    let improvedDescription = response.data.response?.trim() || description;
    improvedDescription = improvedDescription.replace(/^['"]|['"]$/g, "");

    return improvedDescription;
  } catch (error) {
    console.error("Error improving description with Llama:", error);
    return description;
  }
};

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

    // Mejorar la descripción con Llama
    const newDescripcion = await improveDescription(descripcion);

    const newItem = await Item.create({
      nombre,
      descripcion: newDescripcion,
      usuario: req.userId,
    });

    res.status(200).json({
      status: "ok",
      data: newItem,
      originalDescription: descripcion,
    });
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

    const findItem = await Item.findOne({ _id: itemId, usuario: req.userId });

    if (!findItem) {
      return next(appError(400, "MISSING_ITEM", "El item no existe!"));
    }

    if (nombre) {
      findItem.nombre = nombre;
    }

    if (descripcion) {
      const improvedDescription = await improveDescription(descripcion);
      findItem.descripcion = improvedDescription;
    }

    await findItem.save();

    res
      .status(200)
      .json({ status: "ok", msg: "El item fue actualizado", data: findItem });
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

    const findItem = await Item.findOne({ _id: itemId, usuario: req.userId });

    if (!findItem) {
      return next(appError(400, "MISSING_ITEM", "El item no existe!"));
    }

    findItem.esCompletado = state;
    await findItem.save();

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
