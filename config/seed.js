const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');
const connectDB = require('./db');

const seedDatabase = async () => {
    await connectDB();

    try {
        // Create superadmin role
        let superAdminRole = await Role.findOne({ name: 'superadmin' });
        if (!superAdminRole) {
            superAdminRole = new Role({ name: 'superadmin', menus: ['menu1', 'menu2', 'menu3', 'menu4', 'menu5', 'userRoleManagement', 'userManagement'] });
            await superAdminRole.save();
        }

        // Create superadmin user
        const existingSuperAdmin = await User.findOne({ email: 'superadmin@example.com' });
        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('superadminpassword', 10);
            const superAdmin = new User({
                firstname: 'Super',
                lastname: 'Admin',
                email: 'superadmin@example.com',
                password: hashedPassword,
                role: superAdminRole._id,
                menus: superAdminRole.menus
            });
            await superAdmin.save();
            console.log('Superadmin user created');
        } else {
            console.log('Superadmin user already exists');
        }
    } catch (error) {
        console.error('Error seeding database', error);
    }

    mongoose.connection.close();
};

seedDatabase();
