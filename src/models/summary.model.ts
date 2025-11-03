import mongoose, {type Document,type Model, Schema } from 'mongoose';

export interface ISummary {
  noteId: mongoose.Types.ObjectId;
  content: string;
}

export interface ISummaryDocument extends ISummary, Document {
  createdAt: Date;
  updatedAt: Date;
}

const SummarySchema = new Schema<ISummaryDocument>(
  {
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
  },
  { timestamps: true },
);

const Summary: Model<ISummaryDocument> =
  mongoose.models.Summary || mongoose.model<ISummaryDocument>('Summary', SummarySchema);

export default Summary;
