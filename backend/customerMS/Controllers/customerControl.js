const Customer = require('../Model/Customer');

// Function to get the next available tourId
async function getNextTourId() {
  // Find the customer with the highest tourId
  const lastCustomer = await Customer.findOne().sort({ tourId: -1 }).exec();

  // If no customer exists, start from 1
  const nextTourId = lastCustomer ? lastCustomer.tourId + 1 : 1;

  return nextTourId;
}

// Controller to handle customer submission
exports.addCustomer = async (req, res) => {
  try {
    const { firstName, lastName, contactNo, email } = req.body;

    // Get the next tourId
    const tourId = await getNextTourId();

    // Create a new customer object with the incremented tourId
    const newCustomer = new Customer({
      firstName,
      lastName,
      contactNo,
      email,
      tourId, // Use the incremented tourId
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Customer submitted successfully!',
      tourId: savedCustomer.tourId,
    });
  } catch (error) {
    console.error('Error saving customer:', error);
    res.status(500).json({ success: false, message: 'Failed to save customer data.' });
  }
};
