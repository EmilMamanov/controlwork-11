import {Schema, model, Types} from "mongoose";
import User from "./User";

const ProductSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        },
    },

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ['sports', 'tech', 'furniture', 'other'],
        default: 'other',
        required: true,
    },
});

const Product = model('Product', ProductSchema);
export default Product;