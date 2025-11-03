import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Patient from '../models/patient.model.js';

interface CustomError extends Error {
  statusCode?: number;
}

export const registerPatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check 1: User existence error handling
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      const error: CustomError = new Error('A user with this email already exists');
      error.statusCode = 409; // 409 Conflict is appropriate for pre-existing resource
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new patient
    const patient = await Patient.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Optionally generate a token here
    // const token = generateToken(patient._id);

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      // token, // Include token if generated
      patient: {
        _id: patient._id,
        email: patient.email,
        firstName: patient.firstName,
        lastName: patient.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const patients = await Patient.find().select('email');
    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).select('-password');
    if (!patient) {
      const error: CustomError = new Error('Patient not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!patient) {
      const error: CustomError = new Error('Patient not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      const error: CustomError = new Error('Patient not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};
