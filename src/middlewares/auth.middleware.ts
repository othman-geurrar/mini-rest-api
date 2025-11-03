import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import Patient from '../models/patient.model.js';
import type { IPatientDocument } from '../models/patient.model.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IPatientDocument;
    }
  }
}

interface DecodedToken extends JwtPayload {
  patientId: string;
}

interface CustomError extends Error {
  statusCode?: number;
}

// authorize user
export const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      const error: CustomError = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const patient = await Patient.findById(decoded.patientId);

    if (!patient) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Patient not found',
      });
      return;
    }
    req.user = patient;
    next();
  } catch (error) {
    const err = error as CustomError;
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error: err.message,
    });
  }
};
