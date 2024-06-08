const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingSchemacontroller');

router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.delete('/bookings', bookingController.deleteAllBookings);
router.delete('/bookings/:id', bookingController.deleteBookingById);
module.exports = router;
