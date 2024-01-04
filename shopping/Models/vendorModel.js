const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    socialMediaContacts: Array,
    latitude: Number,
    longitude: Number,
    GST: Number,
    mainImg: String,
    FeatureImages: Array,
    Rates: Object,
    isActive: Boolean,
    isAdmin: Boolean,
});

module.exports = mongoose.model('vendors', VendorSchema);