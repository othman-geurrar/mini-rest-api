import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ID format');

export const createVoiceNoteSchema = z
  .object({
    patientId: objectIdSchema,
    title: z
      .string()
      .min(1, 'Title must be at least 1 character long')
      .max(200, 'Title must be less than 200 characters long')
      .trim(),
    duration: z
      .number()
      .min(0, 'Duration must be a positive number')
      .int('Duration must be an integer (seconds/milliseconds)'),
  })
  .strict();

export const updateVoiceNoteSchema = z
  .object({
    patientId: objectIdSchema.optional(),

    title: z
      .string()
      .min(1, 'Title must be at least 1 character long')
      .max(200, 'Title must be less than 200 characters long')
      .trim()
      .optional(),

    duration: z
      .number()
      .min(0, 'Duration must be a positive number')
      .int('Duration must be an integer (seconds/milliseconds)')
      .optional(),
  })
  .strict();
