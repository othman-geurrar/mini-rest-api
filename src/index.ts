import express, { type Express, type Request, type Response } from 'express';
import 'dotenv/config';
import patientsRouter from './routes/patients.js';
import notesRouter from './routes/notes.js';
import summariesRouter from './routes/summaries.js';
import { validateApiKey } from './utils/validateApiKey.js';
import connectDB from './db/mongodb.js';
import authRouter from './routes/auth.js';

const PORT: number = Number(process.env.PORT) || 3000;

const app: Express = express();

app.use(express.json());

app.use(validateApiKey);

app.use('/patients', patientsRouter);
app.use('/notes', notesRouter);
app.use('/summaries', summariesRouter);
app.use('/auth', authRouter);

app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }));

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
