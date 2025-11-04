import mongoose, { Schema } from 'mongoose';
const VoiceNoteSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient ID is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long'],
        maxlength: [200, 'Title must be less than 200 characters long'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [0, 'Duration must be a positive number'],
    },
}, { timestamps: true });
const VoiceNote = mongoose.models.VoiceNote || mongoose.model('VoiceNote', VoiceNoteSchema);
export default VoiceNote;
//# sourceMappingURL=note.model.js.map