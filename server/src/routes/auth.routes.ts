import { Router } from 'express';

const router = Router();

// Example login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // TODO: Implement authentication logic here
  // For now, just a placeholder response
  if (username === 'admin' && password === 'password') {
    return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
