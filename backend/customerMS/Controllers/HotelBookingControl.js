const HotelBooking = require("../Model/HotelBooking");

// Controller to handle hotel booking submission
exports.addHotelBooking = async (req, res) => {
  try {
    const {
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
      budget
    } = req.body;

    // Create a new hotel booking object
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
      budget
    });

    // Save the hotel booking to the database
    const savedHotelBooking = await newHotelBooking.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Hotel booking successful!',
      hotelBookingId: savedHotelBooking._id
    });
  } catch (error) {
    console.error('Error saving hotel booking:', error);
    res.status(500).json({ success: false, message: 'Failed to save hotel booking.' });
  }
};
