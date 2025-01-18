// src/utils/asyncHandler.ts

import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * A route handler that returns a Promise (async function).
 * We specify "unknown" instead of "any" for the promise result.
 */
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * asyncHandler:
 * Wraps an async route handler, catches any error, and passes it to Express "next" middleware.
 */
export function asyncHandler(fn: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => {
    // We cast "fn(req, res, next)" to a Promise<unknown>,
    // then catch any error and pass it to "next".
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
