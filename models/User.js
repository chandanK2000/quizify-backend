const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  mobile: { type: String, required: true, unique: true },
  gender: { type: String },
  state: { type: String },
  profession: { type: String },
  image: { type: String }, 
  bio: { type: String },
  
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
