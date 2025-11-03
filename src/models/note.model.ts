import mongoose, { type Document,type Model, Schema } from 'mongoose';

export interface IVoiceNote {
  patientId: mongoose.Types.ObjectId;
  title: string;
  duration: number;
}

export interface IVoiceNoteDocument extends IVoiceNote, Document {
  createdAt: Date;
  updatedAt: Date;
}

const VoiceNoteSchema = new Schema<IVoiceNoteDocument>(
  {
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
  },
  { timestamps: true },
);

const VoiceNote: Model<IVoiceNoteDocument> =
  mongoose.models.VoiceNote || mongoose.model<IVoiceNoteDocument>('VoiceNote', VoiceNoteSchema);

export default VoiceNote;
