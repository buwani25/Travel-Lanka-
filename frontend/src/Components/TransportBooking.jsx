import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TransportBooking.css'; // Import the CSS for this component

const TransportBookingForm = () => {
  const { tourId } = useParams();
  const [vehicleType, setVehicleType] = useState('');
  const [driverRequired, setDriverRequired] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [numPassengers, setNumPassengers] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Received Tour ID: ${tourId}`);
  }, [tourId]);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear success messages

    if (!numPassengers) {
      setErrorMessage('Number of Passengers is required.');
      return;
    }
    if (!pickupDate || !dropoffDate) {
      setErrorMessage('Pickup and Dropoff dates are required.');
      return;
    }

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const todayDate = new Date(today);

    if (pickup < todayDate) {
      setErrorMessage('Pickup date cannot be in the past.'); // Correct validation
      return;
    }

    if (dropoff < todayDate) {
        setErrorMessage('Dropoff date cannot be in the past.'); // Correct validation
        return;
    }


     if (dropoff < pickup) {
        setErrorMessage('Dropoff date cannot be before pickup date.'); // Correct validation
        return;
    }


    const transportData = {
      tourId,
      vehicleType,
      driverRequired,
      vehicleModel,
      numPassengers,
      specialRequirements,
      pickupDate,
      dropoffDate,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/transport', transportData);
      console.log('Response from API:', response);
      if (response.data.success) {
        setSuccessMessage('Transport booked successfully!');
        // Redirect to Hotel Booking form after 2 seconds
        setTimeout(() => {
          navigate(`/Hotel/${tourId}`);
        }, 2000);
      } else {
        setErrorMessage('Failed to book transport. Please try again.');
      }
    } catch (err) {
      console.error('Error booking transport:', err);
      setErrorMessage('Error booking transport. Please try again.');
    }
  };

  const handleNext = () => {
    navigate(`/Hotel/${tourId}`);
  };

  return (
    <div className="transport-container">
      <h2 className="transport-title">Transport Booking Form</h2>
      <p className="transport-tour-id">Tour ID: {tourId}</p>

      {successMessage && <p className="transport-message">{successMessage}</p>}
      {errorMessage && <p className="transport-error">{errorMessage}</p>}

      <form className="transport-form" onSubmit={handleSubmit}>
        {/* Form fields (unchanged) */}
        <div className="transport-group">
          <label className="transport-label" htmlFor="vehicleType">Vehicle Type:</label>
          <input
            id="vehicleType"
            name="vehicleType"
            className="transport-input"
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          />
        </div>

        <div className="transport-group">
          <label className="transport-label" htmlFor="vehicleModel">Vehicle Model:</label>
          <input
            id="vehicleModel"
            className="transport-input"
            name="vehicleModel" 
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          />
        </div>

        <div className="transport-group">
          <label className="transport-label" htmlFor="numPassengers">Number of Passengers:</label>
          <input
            id="numPassengers"
            className="transport-input"
            name="numPassengers" 
            type="number"
            value={numPassengers}
            onChange={(e) => setNumPassengers(e.target.value)}
            required
          />
        </div>

        <div className="transport-group">
          <label className="transport-label" htmlFor="specialRequirements">Special Requirements:</label>
          <textarea
            id="specialRequirements"
            name="specialRequirements" 
            className="transport-textarea"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
          />
        </div>

        <div className="transport-group">
          <label className="transport-label" htmlFor="driverRequired">Driver Required:</label>
          <select
            className="transport-select"
            id="driverRequired"
            name="driverRequired"
            value={driverRequired}
            onChange={(e) => setDriverRequired(e.target.value)}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/* Pickup Date */}
        <div className="transport-group">
          <label className="transport-label" htmlFor="pickupDate">Pickup Date:</label>
          <input
            id="pickupDate"
            className="transport-input"
            name="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={today}
            required
          />
        </div>
        {/* Dropoff Date */}
        <div className="transport-group">
          <label className="transport-label" htmlFor="dropoffDate">Dropoff Date:</label>
          <input
            id="dropoffDate"
            name="dropoffDate"
            className="transport-input"
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            min={today}
            required
          />
        </div>

        <button className="transport-button" type="submit">Submit</button>
        <button className="transport-button" type="button" onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default TransportBookingForm;
