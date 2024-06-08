const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/register', userController.uploadProfileImage, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.uploadProfileImage, userController.updateUserDetails); 

module.exports = router;
