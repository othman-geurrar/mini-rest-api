import { Router } from 'express';
import {
  getSummaries,
  getSummaryByNoteId,
  getSummaryById,
  createSummary,
  updateSummary,
  deleteSummary,
} from '../controllers/summary.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSummarySchema, updateSummarySchema } from '../schemas/summary.schema.js';
import { validate } from '../middlewares/validateSchema.middleware.js';

const summaryRouter: Router = Router();

summaryRouter.get('/', authorize, getSummaries);
summaryRouter.post('/', validate(createSummarySchema), authorize, createSummary);
summaryRouter.get('/:id', authorize, getSummaryById);
summaryRouter.put('/:id', validate(updateSummarySchema), authorize, updateSummary);
summaryRouter.delete('/:id', authorize, deleteSummary);
summaryRouter.get('/note/:noteId', authorize, getSummaryByNoteId);

export default summaryRouter;
