import type { Request, Response, NextFunction } from 'express';
import {type ZodObject, ZodError, type ZodRawShape } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Custom Error Interface (consistent with your controllers)
interface CustomError extends Error {
  statusCode?: number;
}

export const validate =
  <T extends ZodRawShape>(schema: ZodObject<T>): (req: Request, res: Response, next: NextFunction) => void =>
    (req: Request, res: Response, next: NextFunction): void => {
      try {
        // Validate the request body
        schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          // Use 'zod-validation-error' for a cleaner error message format
          const validationError = fromZodError(err);

          // Create and throw a CustomError with 400 status
          const error: CustomError = new Error(validationError.message);
          error.statusCode = 400; // 400 Bad Request for validation failures
          next(error);
          return;
        }
        // Pass other errors (like server errors) to the general handler
        next(err);
      }
    };
