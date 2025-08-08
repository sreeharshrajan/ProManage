import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateUser, validatePartialUser } from '../validators/user.validator';

const router = Router();

// Public routes
router.post('/', validateUser, UserController.createUser);
router.post('/login', UserController.login);

// Protected routes
router.use(authMiddleware);

router.get('/me', UserController.getCurrentUser);
router.patch('/updatePassword', UserController.changePassword);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', validatePartialUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;