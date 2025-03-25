import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PendingTours.css";

const PendingTours = () => {
  const [pendingTours, setPendingTours] = useState([]);
  const [pendingTransport, setPendingTransport] = useState({}); // Store transport data per tour
  const [pendingHotelBooking, setPendingHotelBooking] = useState({}); // Store hotel booking data per tour
  const [pendingTourPlan, setPendingTourPlan] = useState({});
  const [editingCustomer, setEditingCustomer] = useState(null); // Store the customer to edit
  const [editingTransport, setEditingTransport] = useState(null); // Store the transport to edit
  const [editingHotelBooking, setEditingHotelBooking] = useState(null); // Store the hotel booking to edit
  const [editingTourPlan, setEditingTourPlan] = useState(null);
  const navigate = useNavigate();

  // Fetch all pending tours
  const fetchPendingTours = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setPendingTours(response.data);

      // Fetch transport and hotel booking for each tourId
      response.data.forEach((tour) => {
        fetchPendingTransport(tour.tourId);
        fetchPendingHotelBooking(tour.tourId);
        
      });
    } catch (err) {
      console.error("Error fetching pending tours:", err);
    }
  };

  // Fetch transport data for each tour ID
  const fetchPendingTransport = async (tourId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transport/tour/${tourId}`);
      setPendingTransport((prevState) => ({
        ...prevState,
        [tourId]: response.data,
      }));
    } catch (err) {
      console.error("Error fetching pending transport:", err);
    }
  };

  // Fetch hotel booking data for each tour ID
  const fetchPendingHotelBooking = async (tourId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotel-booking/tour/${tourId}`);
      setPendingHotelBooking((prevState) => ({
        ...prevState,
        [tourId]: response.data,
      }));
    } catch (err) {
      console.error("Error fetching pending hotel booking:", err);
    }
  };

   // Fetch tour plan data for each tour ID
   const fetchPendingTourPlan = async (tourId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tour-plan/tour/${tourId}`);
      setPendingTourPlan((prevState) => ({
        ...prevState,
        [tourId]: response.data,
      }));
    } catch (err) {
      console.error("Error fetching pending tour plan:", err);
    }
  };

  // Handle form change for editing customer details
  const handleCustomerChange = (e) => {
    setEditingCustomer({
      ...editingCustomer,
      [e.target.name]: e.target.value,
    });
  };

  // Update customer details
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/customers/${editingCustomer._id}`, {
        firstName: editingCustomer.firstName,
        lastName: editingCustomer.lastName,
        contactNo: editingCustomer.contactNo,
        email: editingCustomer.email,
      });

      alert("Customer details updated successfully!");
      setEditingCustomer(null); // Close the form
      fetchPendingTours(); // Refetch tours after update
    } catch (err) {
      console.error("Error updating customer details:", err);
      alert("Failed to update customer details.");
    }
  };

  // Handle form change for editing transport details
  const handleTransportChange = (e) => {
    setEditingTransport({
      ...editingTransport,
      [e.target.name]: e.target.value,
    });
  };

  // Update transport details
  const handleUpdateTransport = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/transport/${editingTransport._id}`, {
        vehicleType: editingTransport.vehicleType,
        driverRequired: editingTransport.driverRequired,
      });

      alert("Transport details updated successfully!");
      setEditingTransport(null); // Close the form
      fetchPendingTours(); // Refetch tours and transports
    } catch (err) {
      console.error("Error updating transport details:", err);
      alert("Failed to update transport details.");
    }
  };

  // Handle form change for editing hotel booking details
  const handleHotelBookingChange = (e) => {
    setEditingHotelBooking({
      ...editingHotelBooking,
      [e.target.name]: e.target.value,
    });
  };

  // Update hotel booking details
  const handleUpdateHotelBooking = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/hotel-booking/${editingHotelBooking._id}`, {
        adults: editingHotelBooking.adults,
        children: editingHotelBooking.children,
        rooms: editingHotelBooking.rooms,
      });

      alert("Hotel booking details updated successfully!");
      setEditingHotelBooking(null); // Close the form
      fetchPendingTours(); // Refetch tours and hotel bookings
    } catch (err) {
      console.error("Error updating hotel booking details:", err);
      alert("Failed to update hotel booking details.");
    }
  };

  const handleUpdateTourPlan = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/tour-plan/${editingTourPlan._id}`, {
        firstDestination: editingTourPlan.firstDestination,
        firstFromDate: editingTourPlan.firstFromDate,
        firstToDate: editingTourPlan.firstToDate,
        secondDestination: editingTourPlan.secondDestination,
        secondFromDate: editingTourPlan.secondFromDate,
        secondToDate: editingTourPlan.secondToDate,
        tourGuide: editingTourPlan.tourGuide,
        guideLanguage: editingTourPlan.guideLanguage,
      });

      alert("Tour plan details updated successfully!");
      setEditingTourPlan(null); // Close the form
      fetchPendingTours(); // Refetch tours and tour plans
    } catch (err) {
      console.error("Error updating tour plan details:", err);
      alert("Failed to update tour plan details.");
    }
  };



  // Open update form with the selected customer data
  const openUpdateCustomerForm = (customer) => {
    setEditingCustomer(customer);
  };

  // Open update form with the selected transport data
  const openUpdateTransportForm = (transport) => {
    setEditingTransport(transport);
  };

  // Open update form with the selected hotel booking data
  const openUpdateHotelBookingForm = (hotelBooking) => {
    setEditingHotelBooking(hotelBooking);
  };

  const openUpdateTourPlan = (TourPlan) => {
    setEditingHotelBooking(TourPlan);
  };


  // Close the update forms
  const closeUpdateForms = () => {
    setEditingCustomer(null);
    setEditingTransport(null);
    setEditingHotelBooking(null);
    setEditingTourPlan(null);
  };

  // Delete customer details
  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      fetchPendingTours(); // Refetch tours after deletion
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  // Delete transport details
  const handleDeleteTransport = async (transportId) => {
    try {
      await axios.delete(`http://localhost:5000/api/transport/${transportId}`);
      fetchPendingTours(); // Refetch transport data after deletion
    } catch (err) {
      console.error("Error deleting transport:", err);
    }
  };

  // Delete hotel booking details
  const handleDeleteHotelBooking = async (hotelBookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotel-booking/${hotelBookingId}`);
      fetchPendingTours(); // Refetch hotel booking data after deletion
    } catch (err) {
      console.error("Error deleting hotel booking:", err);
    }
  };
  const handleDeleteTourPlan= async (tourplanId) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotel-booking/${tourplanId}`);
      fetchPendingTours(); // Refetch hotel booking data after deletion
    } catch (err) {
      console.error("Error deleting hotel booking:", err);
    }
  };
  useEffect(() => {
    fetchPendingTours();
  }, []); // Runs once on mount

  return (
    <div className="pending-tours-container">
      {/* Pending Tours Table */}
      <h2>Pending Tours</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tour ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.tourId}</td>
              <td>{tour.firstName}</td>
              <td>{tour.lastName}</td>
              <td>{tour.contactNo}</td>
              <td>{tour.email}</td>
              <td>
                <button onClick={() => openUpdateCustomerForm(tour)} className="update-button">
                  Update 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pending Transport Table */}
      <h2>Pending Transport</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tour ID</th>
            <th>Vehicle Type</th>
            <th>Driver Required</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingTransport[tour.tourId] &&
            pendingTransport[tour.tourId].map((transport) => (
              <tr key={transport._id}>
                <td>{tour.tourId}</td>
                <td>{transport.vehicleType}</td>
                <td>{transport.driverRequired ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => openUpdateTransportForm(transport)} className="update-button">
                    Update 
                  </button>
                  <button onClick={() => handleDeleteTransport(transport._id)} className="delete-button">
                    Delete 
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pending Hotel Booking Table */}
      <h2>Pending Hotel Booking</h2>
      <table className="pending-hotel-booking-table">
        <thead>
          <tr>
            <th>Tour ID</th>
            
            <th>Adults</th>
            <th>Children</th>
            <th>Rooms</th>
            <th>HotelType</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingHotelBooking[tour.tourId] &&
            pendingHotelBooking[tour.tourId].map((hotelBooking) => (
              <tr key={hotelBooking._id}>
                <td>{tour.tourId}</td>
                <td>{hotelBooking.hotelType}</td>
                <td>{hotelBooking.adults}</td>
                <td>{hotelBooking.children}</td>
                <td>{hotelBooking.rooms}</td>
                <td>
                  <button onClick={() => openUpdateHotelBookingForm(hotelBooking)} className="update-button">
                    Update 
                  </button>
                  <button onClick={() => handleDeleteHotelBooking(hotelBooking._id)} className="delete-button">
                    Delete 
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      
      

      {/* Pending Tour Plan Table */}
      <h2>Pending Tour Plan</h2>
      <table className="pending-tour-plan-table">
        <thead>
          <tr>
            <th>Tour ID</th>
            
            <th>Tour Guide</th>
            <th>Guide Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingTourPlan[tour.tourId] &&
            pendingTourPlan[tour.tourId].map((tourPlan) => (
              <tr key={tourPlan._id}>
                <td>{tour.tourId}</td>
                
               
                <td>{tourPlan.tourGuide ? "Yes" : "No"}</td>
                <td>{tourPlan.guideLanguage || "N/A"}</td>
                <td>
                  <button onClick={() => openUpdateTourPlanForm(tourPlan)} className="update-button">
                    Update 
                  </button>
                  <button onClick={() => openDeleteTourPlanForm(tourPlan)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>







      {/* Customer Update Form */}
      {editingCustomer && (
        <div className="update-customer-form">
          <h2>Update Customer Details for Tour ID: {editingCustomer.tourId}</h2>
          <form onSubmit={handleUpdateCustomer}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editingCustomer.firstName}
                onChange={handleCustomerChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editingCustomer.lastName}
                onChange={handleCustomerChange}
              />
            </div>
            <div>
              <label>Contact No:</label>
              <input
                type="text"
                name="contactNo"
                value={editingCustomer.contactNo}
                onChange={handleCustomerChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editingCustomer.email}
                onChange={handleCustomerChange}
              />
            </div>
            <button type="submit">Update Customer</button>
            <button type="button" onClick={closeUpdateForms}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Transport Update Form */}
      {editingTransport && (
        <div className="update-transport-form">
          <h2>Update Transport for Tour ID: {editingTransport.tourId}</h2>
          <form onSubmit={handleUpdateTransport}>
            <div>
              <label>Vehicle Type:</label>
              <input
                type="text"
                name="vehicleType"
                value={editingTransport.vehicleType}
                onChange={handleTransportChange}
              />
            </div>
            <div>
              <label>Driver Required:</label>
              <select
                name="driverRequired"
                value={editingTransport.driverRequired}
                onChange={handleTransportChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <button type="submit">Update Transport</button>
            <button type="button" onClick={closeUpdateForms}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Hotel Booking Update Form */}
      {editingHotelBooking && (
        <div className="update-hotel-booking-form">
          <h2>Update Hotel Booking for Tour ID: {editingHotelBooking.tourId}</h2>
          <form onSubmit={handleUpdateHotelBooking}>
            <div>
              <label>Adults:</label>
              <input
                type="number"
                name="adults"
                value={editingHotelBooking.adults}
                onChange={handleHotelBookingChange}
              />
            </div>
            <div>
              <label>Children:</label>
              <input
                type="number"
                name="children"
                value={editingHotelBooking.children}
                onChange={handleHotelBookingChange}
              />
            </div>
            <div>
              <label>Rooms:</label>
              <input
                type="number"
                name="rooms"
                value={editingHotelBooking.rooms}
                onChange={handleHotelBookingChange}
              />
            </div>
            <button type="submit">Update Hotel Booking</button>
            <button type="button" onClick={closeUpdateForms}>
              Cancel
            </button>
          </form>
        </div>
      )}
      
      
      {/* Tour Plan Update Form */}
      {editingTourPlan && (
        <div className="update-tour-plan-form">
          <h2>Update Tour Plan for Tour ID: {editingTourPlan.tourId}</h2>
          <form onSubmit={handleUpdateTourPlan}>
            <div>
              <label>First Destination:</label>
              <input
                type="text"
                name="firstDestination"
                value={editingTourPlan.firstDestination}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>First From Date:</label>
              <input
                type="date"
                name="firstFromDate"
                value={editingTourPlan.firstFromDate}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>First To Date:</label>
              <input
                type="date"
                name="firstToDate"
                value={editingTourPlan.firstToDate}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>Second Destination:</label>
              <input
                type="text"
                name="secondDestination"
                value={editingTourPlan.secondDestination}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>Second From Date:</label>
              <input
                type="date"
                name="secondFromDate"
                value={editingTourPlan.secondFromDate}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>Second To Date:</label>
              <input
                type="date"
                name="secondToDate"
                value={editingTourPlan.secondToDate}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>Tour Guide:</label>
              <input
                type="text"
                name="tourGuide"
                value={editingTourPlan.tourGuide}
                onChange={handleTourPlanChange}
              />
            </div>
            <div>
              <label>Guide Language:</label>
              <input
                type="text"
                name="guideLanguage"
                value={editingTourPlan.guideLanguage}
                onChange={handleTourPlanChange}
              />
            </div>
            <button type="submit">Update Tour Plan</button>
            <button type="button" onClick={closeUpdateForms}>Cancel</button>
          </form>
        </div>
      )}
    
    </div>
    );
};


export default PendingTours;
