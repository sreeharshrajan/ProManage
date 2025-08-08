import bcrypt from 'bcryptjs';
import mongoose, { Document } from 'mongoose';
import { IUser } from '../types/app/user.type';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
      active: {
    type: Boolean,
    default: true,
    select: false
  },
    deleted_at: { type: Date, default: null }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.deleted_at;
        return ret;
      }
    }
  }
);

// Soft delete plugin
UserSchema.methods.softDelete = function() {
  this.deleted_at = new Date();
  return this.save();
};

// Query helpers
UserSchema.query.notDeleted = function() {
  return this.where({ deleted_at: null });
};

// Password comparison method
UserSchema.methods.correctPassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);