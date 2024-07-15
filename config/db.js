const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vivek:YxJiztecUUbdHagQ@cluster0.kl0i5ua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
           
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
};

module.exports = connectDB;
