import type { NextFunction, Response, Request } from "express";
import type { IMetrics } from "../interface/IMetrics.ts";
import Message from "../models/Message.ts";
import type { IMessage } from "../interface/IMessage.ts";
import { appError } from "../middlewares/errorHandler.ts";

export const metrics: IMetrics = {
  startTime: Date.now(),
  totalRequests: 0,
  byMethod: {},
  byStatus: {},
  byRoute: {},
  responseTimes: [],
};

export const getMessagesFrom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const me = req.userId;
    const { from } = req.query;

    if (typeof from !== "string") {
      return res.status(400).json({ error: "Invalid 'from'" });
    }

    type FilterQuery<T> = {
      [P in keyof T]?: T[P] | { [key: string]: any };
    } & { $or?: Array<FilterQuery<T>> };

    const messages = await Message.find({
      $or: [
        { from: me, to: from },
        { from: from, to: me },
      ],
    } as FilterQuery<IMessage>).sort({ timestamp: 1 });

    res.status(200).json({ status: "ok", data: messages });
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const me = req.userId;

    if (!text) {
      return next(appError(400, "TEXT_REQUIRED", "El texto es requerido"));
    }

    const msg = await Message.findOneAndUpdate(
      { _id: id, from: me?.toString() },
      { text, edited: true },
      { new: true },
    );

    if (!msg) {
      return next(appError(404, "NOT_FOUND", "Mensaje no encontrado o sin permiso"));
    }

    res.status(200).json({ status: "ok", data: msg });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const me = req.userId;

    const msg = await Message.findOneAndDelete({ _id: id, from: me?.toString() });

    if (!msg) {
      return next(appError(404, "NOT_FOUND", "Mensaje no encontrado o sin permiso"));
    }

    res.status(200).json({ status: "ok", msg: "Mensaje eliminado" });
  } catch (error) {
    next(error);
  }
};
