const User = require('../models/User');
const Role = require('../models/Role');

exports.assignRole = async (req, res) => {
    const { userId, roleId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const role = await Role.findById(roleId);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        user.role = role._id;
        user.menus = role.menus; // Optionally, you can update the menus based on the role
        await user.save();
        res.json({ message: 'Role assigned successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning role', error });
    }
};

exports.updateMenus = async (req, res) => {
    const { userId, menus } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.menus = menus;
        await user.save();
        res.json({ message: 'Menus updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating menus', error });
    }
};
