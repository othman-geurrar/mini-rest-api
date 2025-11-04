import { type Document, type Model } from 'mongoose';
export interface IPatient {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    age?: number;
    address?: string;
    weight?: number;
    height?: number;
    nationality?: string;
}
export interface IPatientDocument extends IPatient, Document {
    createdAt: Date;
    updatedAt: Date;
}
declare const Patient: Model<IPatientDocument>;
export default Patient;
