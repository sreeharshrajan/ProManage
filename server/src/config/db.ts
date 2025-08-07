import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Singleton pattern for database connection
let cachedDb: Db | null = null;
let client: MongoClient | null = null;

const getMongoUri = (): string => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Priority: 
  // 1. Explicit MONGO_URI
  // 2. Production URI if in production
  // 3. Local URI as fallback
  return process.env.MONGO_URI 
    || (isProduction 
      ? process.env.MONGO_URI_PRODUCTION 
      : process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/dev');
};

export const connectToMongo = async (): Promise<Db> => {
  if (cachedDb) {
    console.log('♻️ Reusing existing database connection');
    return cachedDb;
  }

  const mongoUri = getMongoUri();
  if (!mongoUri) {
    throw new Error('❌ MongoDB connection URI not configured');
  }

  try {
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50, // Adjust based on your needs
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });

    await client.connect();
    cachedDb = client.db();

    console.log(`✅ MongoDB connected in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📊 Database: ${cachedDb.databaseName}`);
    console.log(`🛠️ Connection pool size: ${client.options.maxPoolSize}`);

    // Cleanup on process termination
    const cleanup = async () => {
      if (client) {
        await client.close();
        console.log('🛑 MongoDB connection closed');
        cachedDb = null;
        client = null;
      }
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('exit', cleanup);

    return cachedDb;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export const disconnectFromMongo = async (): Promise<void> => {
  if (client) {
    await client.close();
    cachedDb = null;
    client = null;
    console.log('🛑 MongoDB connection closed');
  }
};