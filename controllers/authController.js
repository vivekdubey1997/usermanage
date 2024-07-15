
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// controllers/authController.js
const Role = require('../models/Role');
const User = require('../models/User');
const Menu = require('../models/Menu');

exports.signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        // Find or create the default user role
        // let userRole = await Role.findOne({ name: 'user' });
      
            userRole = new Role({ name: 'user' });
            await userRole.save();
        

        // Ensure userRole.menus is defined
        const defaultMenus =  ['menu1', 'menu2', 'menu3', 'menu4', 'menu5'];

        // Find or create the default menus and get their ObjectId
        const menuIds = await Promise.all(
            defaultMenus.map(async menuName => {
                let menu = await Menu.findOne({ name: menuName });
                if (!menu) {
                    menu = new Menu({ name: menuName });
                    await menu.save();
                }
                return menu._id; // Return ObjectId of the menu
            })
        );

        // Create the new user with role and menus (as ObjectId references)
        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
            role: userRole._id,
            menus: menuIds // Assign the array of ObjectId references
        });

        await newUser.save();

        // Return the user with populated role and menus
        const savedUser = await User.findById(newUser._id).populate('role').populate('menus');
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('role');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};



// Function to get all users with populated role and menus
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role').populate('menus');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to update a user by ID (patch)


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Check if updates include a password change
    const isPasswordUpdated = updates.password !== undefined;

    try {
        // If password is updated, hash the new password
        if (isPasswordUpdated) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to delete a user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

