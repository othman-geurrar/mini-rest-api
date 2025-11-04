import type { Request, Response, NextFunction } from 'express';
export declare const registerPatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatients: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
