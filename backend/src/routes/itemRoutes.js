import { createItem, updateItem, deleteItem } from "../controllers/ItemController";
import express from "express";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

// POST /item
router.post("/", verifyToken, createItem);


// PUT /item/:id
router.put("/:id", verifyToken, updateItem);


// DELETE /item/:id
router.delete("/:id", verifyToken, deleteItem);

export default router;