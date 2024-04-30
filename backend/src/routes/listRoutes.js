import express from 'express';
import { getLists } from '../controllers/listController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// get routes
router.get('/', verifyToken, getLists);

export default router;