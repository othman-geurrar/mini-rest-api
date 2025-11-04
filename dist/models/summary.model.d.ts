import mongoose, { type Document, type Model } from 'mongoose';
export interface ISummary {
    noteId: mongoose.Types.ObjectId;
    content: string;
}
export interface ISummaryDocument extends ISummary, Document {
    createdAt: Date;
    updatedAt: Date;
}
declare const Summary: Model<ISummaryDocument>;
export default Summary;
