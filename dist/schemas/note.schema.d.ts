import { z } from 'zod';
export declare const createVoiceNoteSchema: z.ZodObject<{
    patientId: z.ZodString;
    title: z.ZodString;
    duration: z.ZodNumber;
}, z.core.$strict>;
export declare const updateVoiceNoteSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
