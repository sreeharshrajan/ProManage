// controllers/userController.ts
import { Request, Response } from 'express';
import { connectToMongo } from '../config/db';
import { ObjectId } from 'mongodb';
import { User } from '../models/userModel';

const COLLECTION = 'users';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToMongo();
    const user: User = req.body;

    const result = await db.collection(COLLECTION).insertOne(user);
    res.status(201).json({ message: 'User created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const db = await connectToMongo();
    const users = await db.collection(COLLECTION).find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const db = await connectToMongo();
    const id = req.params.id;

    const user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToMongo();
    const id = req.params.id;
    const updates = req.body;

    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToMongo();
    const id = req.params.id;

    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
