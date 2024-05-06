import { createItem, updateItem, deleteItem, gotItem } from "../controllers/ItemController.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// POST /item
router.post("/", verifyToken, createItem);


// PUT /item/:id
router.post("/:id", verifyToken, updateItem);
router.put("/got/:id", verifyToken, gotItem);


// DELETE /item/:id
router.delete("/:id", verifyToken, deleteItem);

export default router;