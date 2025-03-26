const TransportBooking = require('../Model/transportBookings');

// Controller to handle transport booking submission
exports.addTransportBooking = async (req, res) => {
  try {
    const { tourId, vehicleType, driverRequired,vehicleModel,
      numPassengers,
      specialRequirements } = req.body;

    // Create a new transport booking object
    const newTransportBooking = new TransportBooking({
      tourId,
      vehicleType,
      driverRequired,
      vehicleModel,
      numPassengers,
      specialRequirements,

    });

    // Save the transport booking to the database
    const savedTransportBooking = await newTransportBooking.save();
    console.log('Transport Booking Saved:', savedTransportBooking);
    
    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Transport booking successful!',
      transportBookingId: savedTransportBooking._id,
    });
  } catch (error) {
    console.error('Error saving transport booking:', error);
    res.status(500).json({ success: false, message: 'Failed to save transport booking.' });
  }
};
  exports.deleteTransportBooking = async (req, res) => {
    try {
      const transportId = req.params.transportId; // Capture transport ID from the URL parameter
  
      // Delete the transport document from the database
      const deletedTransport = await TransportBooking.findByIdAndDelete(transportId);
  
      if (!deletedTransport) {
        return res.status(404).json({ success: false, message: 'Transport not found.' });
      }
  
      // Send success response
      res.status(200).json({
        success: true,
        message: 'Transport deleted successfully!',
        deletedTransport,
      });
    } catch (error) {
      console.error('Error deleting transport:', error);
      res.status(500).json({ success: false, message: 'Failed to delete transport.' });
    }
  };

