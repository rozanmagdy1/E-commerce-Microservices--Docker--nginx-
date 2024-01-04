const mongoose = require("mongoose");
const dbName = process.env.DB_Name;

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = {connectDB};