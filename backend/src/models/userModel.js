import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
        'Please fill a valid email address'],
    },
    password: { type: String, required: true },
    shoppingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' }],
});

const userModel = mongoose.model('User', userSchema);
export default userModel;