const mongoose = require('mongoose');

const transportBookingSchema = new mongoose.Schema({
  tourId: { type: Number, required: true, ref: 'Customer' },
  vehicleType: { type: String, required: true },
  driverRequired: { type: Boolean, enum: ['Yes', 'No'], required: true },
});

const TransportBooking = mongoose.model('TransportBooking', transportBookingSchema);

module.exports = TransportBooking;
