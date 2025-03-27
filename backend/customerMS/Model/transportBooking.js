const mongoose = require('mongoose');

const transportBookingSchema = new mongoose.Schema({
  tourId: { type: Number, required: true, ref: 'Customer' },
  vehicleType: { type: String, required: true },
  driverRequired: { type: Boolean, enum: ['Yes', 'No'], required: true },
  vehicleModel: { 
    type: String, 
    required: false // Optional field, as it's not always required
  },
  numPassengers: { 
    type: Number, 
    required: true 
  },
  specialRequirements: { 
    type: String, 
    required: false // Optional field
  },
  pickupDate: { type: Date, required: true },
  dropoffDate: { type: Date, required: true }

});

const TransportBooking = mongoose.model('TransportBooking', transportBookingSchema);

module.exports = TransportBooking;
