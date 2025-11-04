import express from 'express';
import 'dotenv/config';
import patientsRouter from './routes/patients.js';
import notesRouter from './routes/notes.js';
import summariesRouter from './routes/summaries.js';
import { validateApiKey } from './utils/validateApiKey.js';
import connectDB from './db/mongodb.js';
import authRouter from './routes/auth.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json" with { type: "json" };
import errorHandler from './middlewares/error.middlware.js';
const PORT = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(validateApiKey);
app.use('/patients', patientsRouter);
app.use('/notes', notesRouter);
app.use('/summaries', summariesRouter);
app.use('/auth', authRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);
connectDB()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map