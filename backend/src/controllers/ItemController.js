import shoppingListModel from "../models/shoppingListModel.js";
import itemModel from "../models/itemModel.js";

// Create new item for shopping list
export const createItem = async (req, res) => {
    const { shoppingListId, name, quantity, done } = req.body;
    console.log("Running Item create");
    console.log(req.body);
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

// Update item done or not done
export const gotItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.done = !item.done;
        await item.save();
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Delete item
export const deleteItem = async (req, res) => {
    console.log("running deleteItem", req.params);
    const { id } = req.params;
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await shoppingListModel.updateMany({ $pull: { items: id } }
        );
        await item.deleteOne({ _id: id });
        res.json({ message: 'Item deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Items with ListDeletion
export const deleteItemWithList = async (id) => {
    try {
        const item = await itemModel.findById(id);
        if (!item) {
            throw new Error('Item not found');
        }
        await shoppingListModel.updateMany({ $pull: { items: id } });
        await item.deleteOne({ _id: id });
        return { message: 'Item deleted' };
    } catch (error) {
        throw new Error(error.message);
    }
};