import { Router } from 'express';
import { getPatients, getPatientById, updatePatient, deletePatient, registerPatient, } from '../controllers/patient.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validateSchema.middleware.js';
import { registerPatientSchema, updatePatientSchema } from '../schemas/patient.schema.js';
const patientRouter = Router();
// GET all patients (requires authorization)
patientRouter.get('/', authorize, getPatients);
// GET a patient by ID (requires authorization)
patientRouter.get('/:id', authorize, getPatientById);
// POST create a new patient
patientRouter.post('/', validate(registerPatientSchema), registerPatient);
// PUT update a patient by ID (requires authorization)
patientRouter.put('/:id', validate(updatePatientSchema), authorize, updatePatient);
// DELETE a patient by ID (requires authorization)
patientRouter.delete('/:id', authorize, deletePatient);
export default patientRouter;
//# sourceMappingURL=patients.js.map