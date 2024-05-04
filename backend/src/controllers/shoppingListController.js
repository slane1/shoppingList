import shoppingListModel from '../models/shoppingListModel.js';
import userModel from '../models/userModel.js';

// Create new shopping list for user
export const createShoppingList = async (req, res) => {
    const { listname } = req.body;
    const userId = req.user._id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const shoppingList = new shoppingListModel({ name: listname, items: [] });
        await shoppingList.save();
        user.shoppingLists.push(shoppingList);
        await user.save();
        res.status(201).json({ message: 'Shopping list created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }

    // Delete shopping list for user
    export const deleteShoppingList = async (req, res) => {
        const { userId, listId } = req.body;
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const shoppingList = await shoppingListModel.findById(listId);
            if (!shoppingList) {
                return res.status(404).json({ message: 'Shopping list not found' });
            }

            await shoppingList.delete();
            user.shoppingLists = user.shoppingLists.filter(list => list._id !== listId);
            await user.save();

            res.status(200).json({ message: 'Shopping list deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Get all shopping lists for user
    export const getShoppingLists = async (req, res) => {
        const { userId } = req.body;
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const shoppingLists = await shoppingListModel.find({ _id: { $in: user.shoppingLists } });
            res.status(200).json(shoppingLists);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
