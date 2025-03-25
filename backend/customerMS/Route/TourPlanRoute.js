const express = require('express');
const router = express.Router();
const TourPlan = require('../Model/TourPlan');  // Assuming the TourPlan model exists

// Post route to handle creating a new tour plan
router.post('/', async (req, res) => {
  const { tourId, firstDestination, firstFromDate, firstToDate, secondDestination, secondFromDate, secondToDate, tourGuide, guideLanguage } = req.body;
  
  try {
    const newTourPlan = new TourPlan({
      tourId,
      firstDestination,
      firstFromDate,
      firstToDate,
      secondDestination,
      secondFromDate,
      secondToDate,
      tourGuide,
      guideLanguage: tourGuide === "Yes" ? guideLanguage : undefined, // If tour guide is "Yes", store guide language
    });
    
    await newTourPlan.save();
    res.status(201).json({ success: true, tourPlan: newTourPlan });
  } catch (err) {
    console.error('Error adding tour plan:', err);
    res.status(500).json({ success: false, message: 'Error adding tour plan.' });
  }
});

// Get tour plan by tour ID
router.get('/tour/:tourId', async (req, res) => {
  const { tourId } = req.params;

  try {
    const tourPlan = await TourPlan.find({ tourId });
    console.log('Tour plan fetched:', tourPlan);

    if (!tourPlan.length) {
      return res.status(404).json({ message: 'No tour plan found for this Tour ID' });
    }

    res.status(200).json(tourPlan);
  } catch (err) {
    console.error('Error fetching tour plan:', err);
    res.status(500).json({ message: 'Error fetching tour plan.' });
  }
});

// Update tour plan
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstDestination, firstFromDate, firstToDate, secondDestination, secondFromDate, secondToDate, tourGuide, guideLanguage } = req.body;

  try {
    const updatedTourPlan = await TourPlan.findByIdAndUpdate(
      id,
      { firstDestination, firstFromDate, firstToDate, secondDestination, secondFromDate, secondToDate, tourGuide, guideLanguage: tourGuide === "Yes" ? guideLanguage : undefined },
      { new: true } // Return updated tour plan
    );

    if (!updatedTourPlan) {
      return res.status(404).json({ message: 'Tour plan not found' });
    }

    res.status(200).json({ success: true, tourPlan: updatedTourPlan });
  } catch (err) {
    console.error('Error updating tour plan:', err);
    res.status(500).json({ message: 'Error updating tour plan.' });
  }
});

// Delete tour plan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTourPlan = await TourPlan.findByIdAndDelete(id);
    if (!deletedTourPlan) {
      return res.status(404).json({ message: 'Tour plan not found' });
    }

    res.status(200).json({ message: 'Tour plan deleted successfully.' });
  } catch (err) {
    console.error('Error deleting tour plan:', err);
    res.status(500).json({ message: 'Error deleting tour plan.' });
  }
});

module.exports = router;
