const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../config/multerConfig');
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, mobile } = req.body;
    const image = req.file ? req.file.path : '';

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const newUser = new User({
      name,
      email,
      password,
      mobile,
      address: '',    // Default value
      gender: '',     // Default value
      state: '',      // Default value
      profession: '', // Default value
      image,
      bio: ''         // Default value
    });

    await newUser.save();
    res.status(201).send(`${name} created successfully`);
  } catch (error) {
    if (error.code === 11000) {
      // Check which field caused the duplicate key error
      const field = Object.keys(error.keyValue)[0];
      if (field === 'email') {
        return res.status(400).send('Email already exists');
      }
      if (field === 'mobile') {
        return res.status(400).send('Mobile number already exists');
      }
    }
    res.status(400).send('Error creating user: ' + error.message);
  }
};


// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Capitalize the first letter of the user's name
    const capitalizedName = user.name.charAt(0).toUpperCase() + user.name.slice(1);

    // Generate token
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    // Include user ID in the response
    res.json({
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      message: `${capitalizedName} logged in successfully`
    });
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user: ' + error.message);
  }
};


// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error.message);
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, mobile, address, gender, state, profession, bio } = req.body;
    const profileImage = req.file ? req.file.path : null; // Get new image path if uploaded

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   user.password = await bcrypt.hash(password, salt);
    // }
    user.mobile = mobile || user.mobile;
    user.address = address || user.address;
    user.gender = gender || user.gender;
    user.state = state || user.state;
    user.profession = profession || user.profession;
    user.image = profileImage || user.image; // Update image field with new path if uploaded
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).send('User details updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user details: ' + error.message);
  }
};

// Multer upload middleware for profile image
exports.uploadProfileImage = upload.single('image');
