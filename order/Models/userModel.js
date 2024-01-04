const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    latitude: Number,
    longitude: Number,
    phone: String,
    profileImg: String,
    isAdmin: Boolean,
    isActive: Boolean,
    verified: Boolean,
});

module.exports = mongoose.model('users', UserSchema);