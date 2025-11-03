import type { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

interface CustomError extends Error {
  statusCode?: number;
}

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Start a Mongoose session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Destructure properties from the request body
    const { email, password, firstName, lastName } = req.body;

    // Check 1: User existence check
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      const error: CustomError = new Error('Patient already exists');
      error.statusCode = 409; // 409 Conflict
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatients = await Patient.create(
      [{ email, password: hashedPassword, firstName, lastName }],
      { session },
    );
    const newPatient = newPatients[0];

    // Check 2: Ensure user creation was successful
    if (!newPatient) {
      throw new Error('Failed to create user during transaction.');
    }

    // Generate JWT token
    const token = jwt.sign(
      { patientId: newPatient._id } as JwtPayload,
      JWT_SECRET as Secret,
      { expiresIn: JWT_EXPIRES_IN as string | number } as SignOptions,
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send response (exclude password)
    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      // Only return necessary user data
      user: {
        _id: newPatient._id,
        email: newPatient.email,
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
      },
      token,
    });
  } catch (error) {
    // Abort transaction on any error
    await session.abortTransaction();
    session.endSession();
    // Pass error to Express error handler
    next(error);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const patient = await Patient.findOne({ email });

    // Check 1: User not found (Using generic message for security)
    if (!patient) {
      const error: CustomError = new Error('Invalid credentials');
      error.statusCode = 401; // 401 Unauthorized
      throw error;
    }

    // Check 2: Validate password (Type assertion 'as string' may be needed if Mongoose schema makes password optional)
    const isPasswordValid = await bcrypt.compare(password, patient.password as string);
    if (!isPasswordValid) {
      const error: CustomError = new Error('Invalid credentials');
      error.statusCode = 401; // 401 Unauthorized
      throw error;
    }

    // Generate token
    const token = jwt.sign(
      { patientId: patient._id } as JwtPayload,
      JWT_SECRET as Secret,
      { expiresIn: JWT_EXPIRES_IN as string | number } as SignOptions,
    );

    // Send response (exclude password)
    res.status(200).json({
      success: true,
      message: 'Patient signed in successfully',
      patient: {
        _id: patient._id,
        email: patient.email,
        firstName: patient.firstName,
        lastName: patient.lastName,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Patient signed out successfully',
  });
};
