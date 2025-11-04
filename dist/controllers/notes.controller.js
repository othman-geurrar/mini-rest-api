import VoiceNote from '../models/note.model.js';
export const getVoiceNotes = async (req, res, next) => {
    try {
        const voiceNotes = await VoiceNote.find().populate('patientId', '-password');
        res.status(200).json({
            success: true,
            voiceNotes,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getVoiceNotesByPatientId = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const voiceNotes = await VoiceNote.find({ patientId }).populate('patientId', '-password');
        res.status(200).json({
            success: true,
            voiceNotes,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getVoiceNoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const voiceNote = await VoiceNote.findById(id).populate('patientId', '-password');
        if (!voiceNote) {
            const error = new Error('Voice note not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            voiceNote,
        });
    }
    catch (error) {
        next(error);
    }
};
export const createVoiceNote = async (req, res, next) => {
    try {
        const { patientId, title, duration } = req.body;
        const voiceNote = await VoiceNote.create({
            patientId,
            title,
            duration,
        });
        res.status(201).json({
            success: true,
            message: 'Voice note created successfully',
            voiceNote,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateVoiceNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const voiceNote = await VoiceNote.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!voiceNote) {
            const error = new Error('Voice note not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Voice note updated successfully',
            voiceNote,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteVoiceNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const voiceNote = await VoiceNote.findByIdAndDelete(id);
        if (!voiceNote) {
            const error = new Error('Voice note not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Voice note deleted successfully',
            voiceNote,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=notes.controller.js.map