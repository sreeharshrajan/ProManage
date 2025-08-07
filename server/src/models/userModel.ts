import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId; // <-- this matches MongoDB
  name: string;
  age: number;
  email: string;
}
