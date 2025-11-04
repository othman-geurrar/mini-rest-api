import type { Request, Response, NextFunction } from 'express';
export declare const getVoiceNotes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getVoiceNotesByPatientId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getVoiceNoteById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createVoiceNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateVoiceNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteVoiceNote: (req: Request, res: Response, next: NextFunction) => Promise<void>;
