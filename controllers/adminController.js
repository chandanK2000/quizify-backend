
const User = require('../models/User');
const bcrypt = require('bcrypt');

// exports.registerAdmin = async (req, res) => {
//   try {
//     const { name, email, password, mobile } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send('User with this email already exists');
//     }
//     const newAdmin = new User({ name, email, password, mobile, role: 'admin' });
//     await newAdmin.save();
//     res.status(201).send('Admin registered successfully');
//   } catch (error) {
//     res.status(500).send('Error registering admin: ' + error.message);
//   }
// };

exports.registerAdmin = async (req, res) => {
  try {
    // Check if there are any existing admins
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).send('Only one admin is allowed');
    }

    const { name, email, password, mobile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const newAdmin = new User({ name, email, password, mobile, role: 'admin' });
    await newAdmin.save();
    res.status(201).send('Admin registered successfully');
  } catch (error) {
    res.status(500).send('Error registering admin: ' + error.message);
  }
};


// Get all admin
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
  } catch (error) {
    res.status(500).send('Error fetching admin users: ' + error.message);
  }
};

// Update admin details
exports.updateAdminDetails = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password, mobile } = req.body;

    // Check if admin exists
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).send('Admin not found');
    }

    // Update admin details
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }
    if (mobile) admin.mobile = mobile;

    await admin.save();

    res.status(200).send('Admin details updated successfully');
  } catch (error) {
    res.status(500).send('Error updating admin details: ' + error.message);
  }
};


///Delete the user

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('admin deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
};
