// controllers/menuController.js
const Menu = require('../models/Menu');

// Create a new menu
exports.createMenu = async (req, res) => {
    const { name } = req.body;
    try {
        const newMenu = new Menu({ name });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single menu by ID
exports.getMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a menu by ID
exports.updateMenu = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(updatedMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a menu by ID
exports.deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMenu = await Menu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
