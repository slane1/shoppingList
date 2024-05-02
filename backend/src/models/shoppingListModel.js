import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

const shoppingListModel = mongoose.model('ShoppingList', shoppingListSchema);
export default shoppingListModel;
