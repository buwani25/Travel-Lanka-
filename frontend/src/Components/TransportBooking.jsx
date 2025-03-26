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
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Received Tour ID: ${tourId}`);
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numPassengers) {
      setSuccessMessage('Number of Passengers is required.');
      return;
    }

    const transportData = { 
      tourId, 
      vehicleType, 
      driverRequired, 
      vehicleModel, 
      numPassengers, 
      specialRequirements ,
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
        setSuccessMessage('Failed to book transport. Please try again.');
      }
    } catch (err) {
      console.error('Error booking transport:', err);
      setSuccessMessage('Error booking transport. Please try again.');
    }
  };

  return (
    <div className="transport-container">
      <h2 className="transport-title">Transport Booking Form</h2>
      <p className="transport-tour-id">Tour ID: {tourId}</p>

      {successMessage && <p className="transport-message">{successMessage}</p>}

      <form className="transport-form" onSubmit={handleSubmit}>
        <div className="transport-group">
          <label className="transport-label" htmlFor="vehicleType">Vehicle Type:</label>
          <input 
            id="vehicleType"
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
            value={driverRequired} 
            onChange={(e) => setDriverRequired(e.target.value)} 
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button className="transport-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransportBookingForm;
