import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { validateUser, validatePartialUser } from '../validators/user.validator';

export class UserController {
  static createUser = async (req: Request, res: Response) => {
     const user = await UserService.createUser(req.validatedData);
    res.status(201).json({
      status: 'success',
      data: user
    });
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token, user } = await UserService.login(email, password);
    res.json({
      status: 'success',
      data: { token, user }
    });
  };

  static getCurrentUser = async (req: Request, res: Response) => {
    const user = await UserService.getCurrentUser(req.user!.id);
    res.json({
      status: 'success',
      data: user
    });
  };

  static getAllUsers = async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.json({
      status: 'success',
      data: users
    });
  };

  static getUserById = async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);
    res.json({
      status: 'success',
      data: user
    });
  };

  static updateUser = async (req: Request, res: Response) => {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.json({
      status: 'success',
      data: user
    });
  };

  static deleteUser = async (req: Request, res: Response) => {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  };

  static changePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const { token } = await UserService.changePassword(
      req.user!.id,
      currentPassword,
      newPassword
    );
    res.json({
      status: 'success',
      data: { token }
    });
  };
}