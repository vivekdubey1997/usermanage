const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/create', roleController.createRole);
router.put('/update/:id', roleController.updateRole);

module.exports = router;
