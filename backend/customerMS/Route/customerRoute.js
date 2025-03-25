const Customer = require('../Model/Customer'); 
const express = require('express');
const router = express.Router();
const customerController = require('../Controllers/customerControl');

// Post route to handle customer submission
router.post('/', customerController.addCustomer);

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();  // Fetch all customers from the database
    res.status(200).json(customers);  // Return the customer data as JSON
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: 'Error fetching customers.' });
  }
});

// Get customer by ID for updating
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id); // Fetch customer by ID
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer); // Return the customer data
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ message: 'Error fetching customer.' });
  }
});

// Update customer
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, contactNo, email } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { firstName, lastName, contactNo, email },
      { new: true } // Ensures that the updated customer is returned
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ success: true, customer: updatedCustomer }); // Return the updated customer data
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ success: false, message: 'Error updating customer.' });
  }
});

// Delete customer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ message: 'Error deleting customer.' });
  }
});

module.exports = router;
