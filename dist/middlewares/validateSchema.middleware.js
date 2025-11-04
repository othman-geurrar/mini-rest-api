import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
export const validate = (schema) => (req, res, next) => {
    try {
        // Validate the request body
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof ZodError) {
            // Use 'zod-validation-error' for a cleaner error message format
            const validationError = fromZodError(err);
            // Create and throw a CustomError with 400 status
            const error = new Error(validationError.message);
            error.statusCode = 400; // 400 Bad Request for validation failures
            next(error);
            return;
        }
        // Pass other errors (like server errors) to the general handler
        next(err);
    }
};
//# sourceMappingURL=validateSchema.middleware.js.map