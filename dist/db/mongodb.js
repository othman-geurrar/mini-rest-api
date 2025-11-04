import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');
    }
    catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
    }
};
export default connectDB;
//# sourceMappingURL=mongodb.js.map