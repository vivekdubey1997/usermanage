// models/Menu.js
const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // You can add more fields related to the menu if needed
}, { timestamps: true });

module.exports = mongoose.model('Menu', MenuSchema);
