import { z } from 'zod';
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ID format');
export const createSummarySchema = z
    .object({
    noteId: objectIdSchema,
})
    .strict();
export const updateSummarySchema = z
    .object({
    noteId: objectIdSchema.optional(),
    content: z.string().min(1, 'Summary content cannot be empty').trim().optional(),
})
    .strict();
//# sourceMappingURL=summary.schema.js.map