const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  tourId: { type: Number, unique: true, required: true }, // auto-increment field
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
