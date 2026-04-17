import type { NextFunction, Request, Response } from "express";
import type { IAppError } from "../interface/IAppError.ts";

export const errorHandler = (
  err: IAppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  res.status(statusCode).json({
    status: "error",
    code,
    message: err.message,
  });
};

export const appError = (
  statusCode: number,
  code: string,
  message: string,
): IAppError => {
  const error = new Error(message) as IAppError;
  error.statusCode = statusCode;
  error.code = code;
  return error;
};
