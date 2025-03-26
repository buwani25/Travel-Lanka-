const express = require('express');
const router = express.Router();
const Transport = require('../Model/transportBooking');  // Assuming the Transport model exists
// Post route to handle transport booking
router.post('/', async (req, res) => {
  const { tourId, vehicleType, driverRequired,vehicleModel,numPassengers,specialRequirements} = req.body;
  try {
    const newTransport = new Transport({ tourId, vehicleType, driverRequired,vehicleModel,numPassengers,
      specialRequirements });
    await newTransport.save();
    res.status(201).json({ success: true, transport: newTransport });
  } catch (err) {
    console.error('Error adding transport:', err);
    res.status(500).json({ success: false, message: 'Error adding transport.' });
  }
});

// Get transport by tour ID
router.get('/tour/:tourId', async (req, res) => {
  const { tourId } = req.params;
  try {
    const transport = await Transport.find({ tourId });
    console.log('Transport fetched:', transport);
    if (!transport.length) {
        return res.status(404).json({ message: 'No transport data found for this Tour ID' });
      }
    res.status(200).json(transport);
  } catch (err) {
    console.error('Error fetching transport:', err);
    res.status(500).json({ message: 'Error fetching transport.' });
  }
});
router.get('/', async (req, res) => {
  try {
    const bookings = await Transport.find(); 
    console.log('All Transport Bookings:', bookings);
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching all transport bookings:', err);
    res.status(500).json({ message: 'Error fetching all transport bookings' });
  }
});

// Update transport
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { vehicleType, driverRequired ,vehicleModel,numPassengers,
    specialRequirement} = req.body;

  try {
    const updatedTransport = await Transport.findByIdAndUpdate(
      id,
      { vehicleType, driverRequired,vehicleModel,numPassengers,
        specialRequirement },
      { new: true } // Return updated transport
    );

    if (!updatedTransport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.status(200).json({ success: true, transport: updatedTransport });
  } catch (err) {
    console.error('Error updating transport:', err);
    res.status(500).json({ message: 'Error updating transport.' });
  }
});

// Delete transport
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransport = await Transport.findByIdAndDelete(id);
    if (!deletedTransport) {
      return res.status(404).json({ message: 'Transport not found' });
    }
    res.status(200).json({ message: 'Transport deleted successfully.' });
  } catch (err) {
    console.error('Error deleting transport:', err);
    res.status(500).json({ message: 'Error deleting transport.' });
  }
});

module.exports = router;
