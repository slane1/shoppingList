import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    done: { type: Boolean, required: true, default: false },
});

const itemModel = mongoose.model('Item', itemSchema);
export default itemModel;