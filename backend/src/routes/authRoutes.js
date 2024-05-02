import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// post routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', verifyToken, logout)

// get routes
//router.get('/auth-user', verifyToken, authUser);

export default router;

