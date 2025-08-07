import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('❌ MONGO_URI is not defined in environment variables');
}

let db: Db | null = null;

export const connectToMongo = async (): Promise<Db> => {
  try {
    if (db) {
      console.log("✅ Reusing existing MongoDB connection");
      return db;
    }

    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('test');

    console.log("✅ Connected to MongoDB successfully");

    // Optional: handle process termination
    process.on('SIGINT', async () => {
      await client.close();
      console.log('🛑 MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
