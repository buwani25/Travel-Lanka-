import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VehicleBooking.css"; // External CSS

const URL = "http://localhost:5000/api/transport";

function VehicleBooking() {
  const [vehicleBooking, setVehicleBooking] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(URL);
        setVehicleBooking(response.data);
      } catch (error) {
        console.error("Error fetching vehicle bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="vehicle-booking-container">
      <h1 className="vehicle-booking-heading">Vehicle Bookings</h1>

      {vehicleBooking.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="vehicle-card-container">
          {vehicleBooking.map((booking) => (
            <div className="vehicle-card" key={booking._id || booking.id}>
              <h3 className="vehicle-card-title">
                Booking ID: {booking._id || booking.id}
              </h3>
              <p><strong>Tour ID:</strong> {booking.tourId}</p>
              <p><strong>Vehicle Type:</strong> {booking.vehicleType}</p>
              <p><strong>Vehicle Model:</strong> {booking.vehicleModel}</p>
              <p><strong>No of Passengers:</strong> {booking.numPassengers}</p>
              <p><strong>Driver Required:</strong> {booking.driverRequired ? "Yes" : "No"}</p>
              <p><strong>Special Requirements:</strong> {booking.specialRequirement}</p>
              <button className="proceed-button">Proceed</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleBooking;
