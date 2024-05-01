import shoppingListModel from "../models/shoppingListModel";
import itemModel from "../models/itemModel";

// Create new item for shopping list
export const createItem = async (req, res) => {
    const { shoppingListId, name, quantity, done } = req.body;
    try {
        const shoppingList = await shoppingListModel.findById(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        const item = new itemModel({ name, quantity, done });
        await item.save();
        shoppingList.items.push(item);
        await shoppingList.save();
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update item
export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, done } = req.body;
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name;
        item.quantity = quantity;
        item.done = done;
        await item.save();
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete item
export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.remove();
        res.json({ message: 'Item deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}