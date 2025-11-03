import type { Request, Response, NextFunction } from 'express';
import Summary from '../models/summary.model.js';
import { generateAISummary } from '../services/ai.service.js';

interface CustomError extends Error {
  statusCode?: number;
}

export const getSummaries = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const summaries = await Summary.find().populate('noteId');
    res.status(200).json({
      success: true,
      summaries,
    });
  } catch (error) {
    next(error);
  }
};

export const getSummaryByNoteId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { noteId } = req.params;
    const summary = await Summary.findOne({ noteId }).populate('noteId');
    if (!summary) {
      const error: CustomError = new Error('Summary not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

export const getSummaryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const summary = await Summary.findById(id).populate('noteId');
    if (!summary) {
      const error: CustomError = new Error('Summary not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

export const createSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Only extract noteId from the request body
    const { noteId } = req.body;

    // Check if summary already exists for this note
    const existingSummary = await Summary.findOne({ noteId });
    if (existingSummary) {
      const error: CustomError = new Error('Summary already exists for this note');
      error.statusCode = 400;
      throw error;
    }

    // *** NEW AI STEP ***
    // 1. Call the service to generate the summary content
    const summaryContent = await generateAISummary(noteId);

    // 2. Create the summary using the generated content
    const summary = await Summary.create({
      noteId,
      content: summaryContent, // Use the content from the AI service
    });

    res.status(201).json({
      success: true,
      message: 'AI Summary created successfully',
      summary,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const summary = await Summary.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!summary) {
      const error: CustomError = new Error('Summary not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Summary updated successfully',
      summary,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const summary = await Summary.findByIdAndDelete(id);
    if (!summary) {
      const error: CustomError = new Error('Summary not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: 'Summary deleted successfully',
      summary,
    });
  } catch (error) {
    next(error);
  }
};
