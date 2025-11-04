import type { Request, Response, NextFunction } from 'express';
export declare const getSummaries: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSummaryByNoteId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSummaryById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
