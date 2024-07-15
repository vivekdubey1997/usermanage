const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/assign-role', userController.assignRole);
router.patch('/update-menus', userController.updateMenus);

module.exports = router;
