import mongoose, { type Document, type Model } from 'mongoose';
export interface IVoiceNote {
    patientId: mongoose.Types.ObjectId;
    title: string;
    duration: number;
}
export interface IVoiceNoteDocument extends IVoiceNote, Document {
    createdAt: Date;
    updatedAt: Date;
}
declare const VoiceNote: Model<IVoiceNoteDocument>;
export default VoiceNote;
