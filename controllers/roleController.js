const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    const { name, menus } = req.body;
    try {
        const newRole = new Role({ name, menus });
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, menus } = req.body;
    try {
        const role = await Role.findByIdAndUpdate(id, { name, menus }, { new: true });
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json({ message: 'Role updated successfully', role });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};
