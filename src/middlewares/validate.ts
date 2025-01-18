import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * A reusable Express middleware that:
 * 1. Parses req.body, req.query, req.params (optional).
 * 2. Throws a 400 response if validation fails.
 * 3. Calls next() if validation passes.
 */
export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // We can parse multiple parts if needed. Example includes only body:
      schema.parse({
        body: req.body,
      });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const allMessages = err.errors.map((issue) => issue.message);
        // Format ZodError into a readable response
        return res.status(400).json({
          success: false,
          message: allMessages.join(",") || "Validation error",
        }) as unknown as void;
      }
      return next(err); // Pass non-Zod errors to the global error handler
    }
  };
