import { Router } from 'express';
import { getVoiceNotes, getVoiceNotesByPatientId, getVoiceNoteById, createVoiceNote, updateVoiceNote, deleteVoiceNote, } from '../controllers/notes.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validateSchema.middleware.js';
import { createVoiceNoteSchema, updateVoiceNoteSchema } from '../schemas/note.schema.js';
const voiceNoteRouter = Router();
voiceNoteRouter.get('/', authorize, getVoiceNotes);
voiceNoteRouter.post('/', validate(createVoiceNoteSchema), createVoiceNote);
voiceNoteRouter.get('/:id', authorize, getVoiceNoteById);
voiceNoteRouter.put('/:id', validate(updateVoiceNoteSchema), authorize, updateVoiceNote);
voiceNoteRouter.delete('/:id', authorize, deleteVoiceNote);
voiceNoteRouter.get('/patient/:patientId', authorize, getVoiceNotesByPatientId);
export default voiceNoteRouter;
//# sourceMappingURL=notes.js.map