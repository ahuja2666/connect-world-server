// src/utils/response.ts
import { Response } from "express";

export function successResponse(
  res: Response,
  data: unknown = {},
  message?: string,
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message: message || "Success",
    data,
  });
}

export function errorResponse(
  res: Response,
  message: string,
  statusCode = 500
) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
