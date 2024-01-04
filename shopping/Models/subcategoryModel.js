const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    stock: Number,
    mainImg: String,
    categoryID: String,
    isActive: Boolean
});

module.exports = mongoose.model('subcategories', SubCategorySchema);