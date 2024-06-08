const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  skillCenter: { type: String, required: true },
  course: { type: String, required: true },
  coursetype: { type: String, required: true }, 
  message: { type: String }
});

module.exports = mongoose.model('Booking', bookingSchema);
