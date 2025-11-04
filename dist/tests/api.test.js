import { describe, it, expect } from 'vitest';
import { registerPatientSchema } from '../schemas/patient.schema.js';
describe('Patient validation', () => {
    it('fails when name is too short', () => {
        const result = registerPatientSchema.safeParse({ name: 'A', age: 30 });
        expect(result.success).toBe(false);
    });
    it('passes with valid data', () => {
        const result = registerPatientSchema.safeParse({ name: 'Alice', age: 25 });
        expect(result.success).toBe(true);
    });
});
//# sourceMappingURL=api.test.js.map