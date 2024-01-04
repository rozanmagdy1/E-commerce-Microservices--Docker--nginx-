const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: {
        type: Array,
        required: true,
    },
    EstimatedFor: String,
    latitude: Number,
    longitude: Number,
    couponID: String,
    user: Object,
    shipping: Number,
    subTotalPrice: Number,
    totalPrice: Number,
    isActive: Boolean,
});

module.exports = mongoose.model('orders', OrderSchema);