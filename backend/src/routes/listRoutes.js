import express from 'express';
import { getShoppingLists } from '../controllers/shoppingListController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// get routes
router.get('/', verifyToken, getShoppingLists);

export default router;