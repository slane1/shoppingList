import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { createShoppingList, deleteShoppingList, getShoppingLists, getShoppingListsId } from '../controllers/shoppingListController.js';

const router = express.Router();

// POST /shopping-list
router.post('/', verifyToken, createShoppingList);

// GET /shopping-list
router.get('/', verifyToken, getShoppingLists);
router.get('/:id', verifyToken, getShoppingListsId);

// Delete /shopping-list/:id
router.delete('/:id', verifyToken, deleteShoppingList);


export default router;