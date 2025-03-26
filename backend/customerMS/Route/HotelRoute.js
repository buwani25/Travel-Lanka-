const express = require('express');
const router = express.Router();
const HotelBooking = require('../Model/HotelBooking'); // Assuming the model exists

// Create a new hotel booking
router.post('/', async (req, res) => {
  const { tourId, firstDestination, firstFromDate, firstToDate, secondDestination, secondFromDate, secondToDate, adults, children, rooms, hotelType, budget } = req.body;
  
  try {
    const newHotelBooking = new HotelBooking({
      tourId,
      firstDestination,
      firstFromDate,
      firstToDate,
      secondDestination,
      secondFromDate,
      secondToDate,
      adults,
      children,
      rooms,
      hotelType,
      budget,
    });
    await newHotelBooking.save();
    res.status(201).json({ success: true, hotelBooking: newHotelBooking });
  } catch (err) {
    console.error('Error adding hotel booking:', err);
    res.status(500).json({ success: false, message: 'Error adding hotel booking.' });
  }
});

// Get hotel booking by tour ID
router.get('/tour/:tourId', async (req, res) => {
  const { tourId } = req.params;
  try {
    const hotelBooking = await HotelBooking.find({ tourId });
    if (!hotelBooking.length) {
      return res.status(404).json({ message: 'No hotel booking found for this Tour ID' });
    }
    res.status(200).json(hotelBooking);
  } catch (err) {
    console.error('Error fetching hotel booking:', err);
    res.status(500).json({ message: 'Error fetching hotel booking.' });
  }
});

// Update hotel booking (only adults, children, rooms)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { adults, children, rooms } = req.body;
  
  try {
    const updatedHotelBooking = await HotelBooking.findByIdAndUpdate(
      id,
      { adults, children, rooms },
      { new: true }
    );
    
    if (!updatedHotelBooking) {
      return res.status(404).json({ message: 'Hotel booking not found' });
    }
    
    res.status(200).json({ success: true, hotelBooking: updatedHotelBooking });
  } catch (err) {
    console.error('Error updating hotel booking:', err);
    res.status(500).json({ message: 'Error updating hotel booking.' });
  }
});

// Delete hotel booking
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedHotelBooking = await HotelBooking.findByIdAndDelete(id);
    if (!deletedHotelBooking) {
      return res.status(404).json({ message: 'Hotel booking not found' });
    }
    res.status(200).json({ message: 'Hotel booking deleted successfully.' });
  } catch (err) {
    console.error('Error deleting hotel booking:', err);
    res.status(500).json({ message: 'Error deleting hotel booking.' });
  }
});

// Get all hotel bookings
router.get('/', async (req, res) => {
  try {
    const hotelBookings = await HotelBooking.find();
    res.status(200).json(hotelBookings);
  } catch (err) {
    console.error('Error fetching hotel bookings:', err);
    res.status(500).json({ message: 'Error fetching hotel bookings.' });
  }
});

module.exports = router;
