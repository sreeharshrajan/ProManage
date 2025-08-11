import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongo = async (): Promise<void> => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';

    const dbUri = isProduction
      ? process.env.MONGO_URI_PRODUCTION
      : process.env.MONGO_URI_LOCAL;

    if (!dbUri) {
      throw new Error('Database URI not provided in environment variables');
    }

    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB connected in ${isProduction ? 'production' : 'development'} mode`);
    if (mongoose.connection.db) {
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    } else {
      console.log('📊 Database: (not available)');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectToMongo;
