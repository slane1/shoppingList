import shoppingListModel from '../models/shoppingListModel.js';
import userModel from '../models/userModel.js';

// Create new shopping list for user
export const createShoppingList = async (req, res) => {
    const newList  = req.body.title;
    console.log(newList);
    console.log("running createShoppingList");
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const shoppingList = new shoppingListModel({ name: newList, items: [] });
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
            const user = await userModel.findById(req.user.id);
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
        try {
            const user = await userModel.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userLists = await shoppingListModel.find({ _id: { $in: user.shoppingLists } });
            const shoppingLists = userLists.map(list => {
                return {
                    ...list._doc,
                    title: list.name,
                    id: list._id.toString()
                };
            });
            res.status(200).json(shoppingLists);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Get shopping list by id
    export const getShoppingListsId = async (req, res) => {
        const { id } = req.params;
        try {
            const shoppingList = await shoppingListModel.findById(id);
            if (!shoppingList) {
                return res.status(404).json({ message: 'Shopping list not found' });
            }
            res.status(200).json(shoppingList);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
