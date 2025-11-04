import type { Request, Response, NextFunction } from 'express';
import { type ZodObject, type ZodRawShape } from 'zod';
export declare const validate: <T extends ZodRawShape>(schema: ZodObject<T>) => (req: Request, res: Response, next: NextFunction) => void;
