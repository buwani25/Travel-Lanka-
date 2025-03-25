const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
  tourId: { type: Number, required: true },
  firstDestination: { type: String, required: true },
  firstFromDate: { type: Date, required: true },
  firstToDate: { type: Date, required: true },
  secondDestination: { type: String, required: true },
  secondFromDate: { type: Date, required: true },
  secondToDate: { type: Date, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  rooms: { type: Number, required: true },
  hotelType: { type: String, required: true },
  budget: { type: Number, required: true }
});

// Create the HotelBooking model
const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);

module.exports = HotelBooking;
