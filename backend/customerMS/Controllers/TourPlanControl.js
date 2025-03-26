const TourPlan = require('../Model/TourPlan');

// Controller to handle tour plan submission
exports.addTourPlan = async (req, res) => {
  try {
    const {
      tourId,
      firstDestination,
      firstFromDate,
      firstToDate,
      secondDestination,
      secondFromDate,
      secondToDate,
      tourGuide,
      guideLanguage
    } = req.body;

   

    // Create a new tour plan object
    const newTourPlanData = new TourPlan({
      tourId,
      firstDestination,
      firstFromDate,
      firstToDate,
      secondDestination,
      secondFromDate,
      secondToDate,
      tourGuide,
      guideLanguage
    });
    

    // Create a new tour plan object
    const newTourPlan = new TourPlan(newTourPlanData);
    // Save the tour plan to the database
    const savedTourPlan = await newTourPlan.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Tour plan submitted successfully!',
      tourPlanId: savedTourPlan._id,
    });
  } catch (error) {
    console.error('Error saving tour plan:', error);
    res.status(500).json({ success: false, message: 'Failed to save tour plan.' });
  }
};
