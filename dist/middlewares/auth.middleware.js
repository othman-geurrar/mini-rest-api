import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import Patient from '../models/patient.model.js';
// authorize user
export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const patient = await Patient.findById(decoded.patientId);
        if (!patient) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: Patient not found',
            });
            return;
        }
        req.user = patient;
        next();
    }
    catch (error) {
        const err = error;
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: err.message,
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map