import { z } from 'zod';
export declare const createSummarySchema: z.ZodObject<{
    noteId: z.ZodString;
}, z.core.$strict>;
export declare const updateSummarySchema: z.ZodObject<{
    noteId: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
