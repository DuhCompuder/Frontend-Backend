const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    "productName": {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    "quantityInstock": {
        type: Number,
        required: true,
    }
});

const ProductModel = mongoose.model("productinfo", ProductSchema)
module.exports = ProductModel;