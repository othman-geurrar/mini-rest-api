import { Router } from 'express';
import { signup, signin, signout } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validateSchema.middleware.js';
import { loginPatientSchema, registerPatientSchema } from '../schemas/patient.schema.js';
const authRouter = Router();
authRouter.post('/sign-up', validate(registerPatientSchema), signup);
authRouter.post('/sign-in', validate(loginPatientSchema), signin);
authRouter.post('/sign-out', signout);
export default authRouter;
//# sourceMappingURL=auth.js.map