import type { Request, Response, NextFunction } from 'express';
import type { IPatientDocument } from '../models/patient.model.js';
declare global {
    namespace Express {
        interface Request {
            user?: IPatientDocument;
        }
    }
}
export declare const authorize: (req: Request, res: Response, next: NextFunction) => Promise<void>;
