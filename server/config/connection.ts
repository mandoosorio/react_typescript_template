import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/online_store', {});

export default mongoose.connection;