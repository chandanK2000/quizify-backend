
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin registration endpoint
router.post('/register', adminController.registerAdmin);

// Delete user endpoint (accessible only to admins)
router.delete('/users/:id', adminController.deleteUser);

//get admin
router.get('/', adminController.getAllAdmins);

//update admins
router.put('/admins/:id', adminController.updateAdminDetails);

module.exports = router;
