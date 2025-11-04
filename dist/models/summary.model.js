import mongoose, { Schema } from 'mongoose';
const SummarySchema = new Schema({
    noteId: {
        type: Schema.Types.ObjectId,
        ref: 'VoiceNote',
        required: [true, 'Note ID is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        minlength: [1, 'Content must be at least 1 character long'],
    },
}, { timestamps: true });
const Summary = mongoose.models.Summary || mongoose.model('Summary', SummarySchema);
export default Summary;
//# sourceMappingURL=summary.model.js.map