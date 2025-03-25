import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import "./HotelBooking.css";

const HotelBookingForm = () => {
  const { tourId } = useParams();

  const [firstDestination, setFirstDestination] = useState("");
  const [firstFromDate, setFirstFromDate] = useState("");
  const [firstToDate, setFirstToDate] = useState("");
  const [secondDestination, setSecondDestination] = useState("");
  const [secondFromDate, setSecondFromDate] = useState("");
  const [secondToDate, setSecondToDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [hotelType, setHotelType] = useState("Select");
  const [budget, setBudget] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelBookingData = {
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
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:5000/api/hotel-booking', hotelBookingData);

      if (response.data.success) {
        setSuccessMessage('Hotel Booking successful!');
        setTimeout(() => {
          navigate(`/Tour/${tourId}`);
        }, 2000); // Delay before redirecting to Transport form
      }
    } catch (err) {
      console.error('Error booking hotel:', err);
      setErrorMessage('Failed to book hotel. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle Next button click (navigate to the Transport form)
  const handleNext = () => {
    navigate(`/Tour/${tourId}`); // Navigate to Transport form
  };

  return (
    <div className="hotel-form-container">
      <form className="hotel-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Hotel Booking Form</h2>
        <p className="tour-id">Tour ID: {tourId}</p>

       

        <label className="form-label">First Destination:</label>
        <input
          className="form-input"
          type="text"
          value={firstDestination}
          onChange={(e) => setFirstDestination(e.target.value)}
          required
        />

        <div className="form-group-row">
          <div>
            <label className="form-label">First Destination From:</label>
            <input
              className="form-input"
              type="date"
              value={firstFromDate}
              onChange={(e) => setFirstFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">First Destination To:</label>
            <input
            className="form-input"
              type="date"
              value={firstToDate}
              onChange={(e) => setFirstToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <label className="form-label">Second Destination:</label>
        <input
          className="form-input"
          type="text"
          value={secondDestination}
          onChange={(e) => setSecondDestination(e.target.value)}
          required
        />

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label">Second Destination From:</label>
            <input
              className="form-input"
              type="date"
              value={secondFromDate}
              onChange={(e) => setSecondFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Second Destination To:</label>
            <input
            className="form-input"
              type="date"
              value={secondToDate}
              onChange={(e) => setSecondToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group-row">
          <div className="form-group">
            <label className="form-label">Adults:</label>
            <input
              className="form-input"
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label className="form-label">Children:</label>
            <input 
              className="form-input"
              type="number"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <label className="form-label">Rooms:</label>
        <input
          className="form-input"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          min="1"
        />

        <label className="form-label">Hotel Type:</label>
        <select
          className="form-input"
          value={hotelType}
          onChange={(e) => setHotelType(e.target.value)}
        >
          <option value="Select">Select</option>
          <option value="5-star">5 Star</option>
          <option value="4-star">4 Star</option>
          <option value="3-star">3 Star</option>
        </select>

        <label className="form-label">Budget Per Night:</label>
        <input
          className="form-input"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Submit'}
        </button>

        <button className="next-button" type="button" onClick={handleNext} disabled={loading}>
          Next
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default HotelBookingForm;
