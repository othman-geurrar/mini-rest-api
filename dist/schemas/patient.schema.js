import { z } from 'zod';
// Base schema for common fields
const patientBaseSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
// Schema for registration (requires first and last name)
export const registerPatientSchema = patientBaseSchema.extend({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
});
// Schema for login (only needs email and password)
export const loginPatientSchema = patientBaseSchema;
export const updatePatientSchema = z
    .object({
    email: z.string().email('Invalid email format').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
})
    .strict();
//# sourceMappingURL=patient.schema.js.map