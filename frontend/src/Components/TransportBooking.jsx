import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TransportBooking.css'; // Import the CSS for this component

const TransportBookingForm = () => {
  const { tourId } = useParams();  // Get the tourId from the URL
  const [vehicleType, setVehicleType] = useState('');
  const [driverRequired, setDriverRequired] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    console.log(`Received Tour ID: ${tourId}`);
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transportData = { tourId, vehicleType, driverRequired };

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
    <div className="transport-form-container">
      <h2 className='form-title'>Transport Booking Form</h2>
      <p className='tour-id'>Tour ID: {tourId}</p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="vehicleType">Vehicle Type:</label>
          <input 
            id="vehicleType"
            className='form-input'
            type="text" 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="driverRequired">Driver Required:</label>
          <select 
            className="form-select"
            id="driverRequired"
            value={driverRequired} 
            onChange={(e) => setDriverRequired(e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransportBookingForm;
