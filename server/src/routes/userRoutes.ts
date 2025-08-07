// routes/userRoutes.ts
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

import { validate } from '../middlewares/validate';
import { userSchema } from '../schemas/userSchema.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validate(userSchema), createUser);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
