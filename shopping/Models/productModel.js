const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    description: {
        type: String,
        required: true,
    },
    SKU: {
        type: String,
        required: true,
    }, 
    MFD: {
        type: Date,
        required: true,
    },
    EXD: {
        type: Date,
        required: true,
    },
    size: Array,
    categoryID: String,
    subcategoryID: String,
    vendorID: String,
    Rates: Object,
    stock: Number,
    mainImg: String,
    FeatureImages: Array,
    isActive: Boolean,
});

module.exports = mongoose.model('products', ProductSchema);