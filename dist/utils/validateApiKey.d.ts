import type { Request, Response, NextFunction } from 'express';
export declare const validateApiKey: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateApiKeyWithType: (req: Request, res: Response, next: NextFunction) => void;
