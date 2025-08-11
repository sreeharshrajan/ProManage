import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UpdateUserPayload } from '../types/app/user.type';

export class UserController {
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(
        req.params.id,
        req.body as UpdateUserPayload
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}