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
        fetchPendingTourPlan(tour.tourId);
        
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
    // Check if pickupDate and dropoffDate are in the future
  const currentDate = new Date().toISOString().split("T")[0];
  
  if (editingTransport.pickupDate < currentDate) {
    alert("Pickup date cannot be in the past.");
    return;
  }
  if (editingTransport.dropoffDate < currentDate) {
    alert("Dropoff date cannot be in the past.");
    return;
  }

    try {
      await axios.put(`http://localhost:5000/api/transport/${editingTransport._id}`, {
        vehicleType: editingTransport.vehicleType,
        driverRequired: editingTransport.driverRequired,
        vehicleModel: editingTransport.vehicleModel,
        numPassengers:editingTransport.numPassengers,
        specialRequirements:editingTransport.specialRequirements,
        pickupDate: editingTransport.pickupDate,
        dropoffDate: editingTransport.dropoffDate,
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
//update tour plan 
const handleTourPlanChange = (e) => {
  setEditingTourPlan({
    ...editingTourPlan,
    [e.target.name]: e.target.value,
  });
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

  const openUpdateTourPlanForm = (TourPlan) => {
    setEditingTourPlan(TourPlan);
  };


  // Close the update forms
  const closeUpdateForms = () => {
    setEditingCustomer(null);
    setEditingTransport(null);
    setEditingHotelBooking(null);
    setEditingTourPlan(null);
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
  const handleDeleteTourPlan = async (tourplanId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tour-plan/${tourplanId}`);
      fetchPendingTours(); // Refetch hotel booking data after deletion
    } catch (err) {
      console.error("Error deleting tour plan booking:", err);
    }
  };
  useEffect(() => {
    fetchPendingTours();
  }, []); // Runs once on mount

  return (
    <div className="pending-tours-container">
      {/* Pending Tours Table */}
      <h2 className="customer-details-h2">Customer Details</h2>
      <table className="pending-tours-table">
        <thead>
          <tr>
            <th className="pending-tours-th">Tour ID</th>
            <th className="pending-tours-th">First Name</th>
            <th className="pending-tours-th">Last Name</th>
            <th className="pending-tours-th">Contact No</th>
            <th className="pending-tours-th">Email</th>
            <th className="pending-tours-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) => (
            <tr key={tour._id}>
              <td className="pending-tours-td">{tour.tourId}</td>
              <td className="pending-tours-td">{tour.firstName}</td>
              <td className="pending-tours-td">{tour.lastName}</td>
              <td className="pending-tours-td">{tour.contactNo}</td>
              <td className="pending-tours-td">{tour.email}</td>
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
      <h2 className="pending-transport-h2">Pending Transport</h2>
      <table className="pending-transport-table">
        <thead>
          <tr>
            <th className="pending-transport-th">Tour ID</th>
            <th className="pending-transport-th">Vehicle Type</th>
            <th className="pending-transport-th">Driver Required</th>
            <th className="pending-transport-th">Vehicle Model</th>
            <th className="pending-transport-th">No.Passengers</th>
            <th className="pending-transport-th">SpecialRequirements</th>
            <th className="pending-transport-th">Pickup Date</th>
            <th className="pending-transport-th">Dropoff Date</th>
            <th className="pending-transport-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingTransport[tour.tourId] &&
            pendingTransport[tour.tourId].map((transport) => (
              <tr key={transport._id}>
                <td className="pending-transport-td">{tour.tourId}</td>
                <td className="pending-transport-td">{transport.vehicleType}</td>
                <td className="pending-transport-td">{transport.driverRequired ? "Yes" : "No"}</td>
                <td className="pending-transport-td">{transport.vehicleModel}</td>
                <td className="pending-transport-td">{transport.numPassengers}</td>
                <td className="pending-transport-td">{transport.specialRequirements}</td>
                {/* Added Pickup Date */}
          <td className="pending-transport-td">
            {transport.pickupDate ? new Date(transport.pickupDate).toLocaleDateString() : "N/A"}
          </td>

          {/* Added Dropoff Date */}
          <td className="pending-transport-td">
            {transport.dropoffDate ? new Date(transport.dropoffDate).toLocaleDateString() : "N/A"}
          </td>
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
      <h2 className="pending-hotel-h2">Pending Hotel Booking</h2>
      <table className="pending-hotel-booking-table">
        <thead>
          <tr>
            <th className="pending-hotel-th">Tour ID</th>
            
            <th className="pending-hotel-th">HotelType</th>
            <th className="pending-hotel-th">Adults</th>
            <th className="pending-hotel-th">Children</th>
            <th className="pending-hotel-th">Rooms</th>
            <th className="pending-hotel-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingHotelBooking[tour.tourId] &&
            pendingHotelBooking[tour.tourId].map((hotelBooking) => (
              <tr key={hotelBooking._id}>
                <td className="pending-hotel-td">{tour.tourId}</td>
                <td className="pending-hotel-td">{hotelBooking.hotelType}</td>
                <td className="pending-hotel-td">{hotelBooking.adults}</td>
                <td className="pending-hotel-td">{hotelBooking.children}</td>
                <td className="pending-hotel-td">{hotelBooking.rooms}</td>
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
      <h2 className="pending-tour-plan-h2">Pending Tour Plan</h2>
      <table className="pending-tour-plan-table">
        <thead>
          <tr>
            <th className="pending-tour-plan-th">Tour ID</th>
            
            <th className="pending-tour-plan-th" >Tour Guide</th>
            <th className="pending-tour-plan-th">Guide Language</th>
            <th className="pending-tour-plan-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTours.map((tour) =>
            pendingTourPlan[tour.tourId] &&
            pendingTourPlan[tour.tourId].map((tourPlan) => (
              <tr key={tourPlan._id}>
                <td className="pending-tour-plan-td">{tour.tourId}</td>
                <td className="pending-tour-plan-td">{tourPlan.tourGuide ? "Yes" : "No"}</td>
                <td className="pending-tour-plan-td">{tourPlan.guideLanguage || "N/A"}</td>
                <td>
                  <button onClick={() => openUpdateTourPlanForm(tourPlan)} className="update-button">
                    Update 
                  </button>
                  <button onClick={() =>handleDeleteTourPlan(tourPlan._id)} className="delete-button">
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
            <div className="form-groups">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editingCustomer.firstName}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-groups">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editingCustomer.lastName}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-groups">
              <label>Contact No:</label>
              <input
                type="text"
                name="contactNo"
                value={editingCustomer.contactNo}
                onChange={handleCustomerChange}
              />
            </div>
            <div className="form-groups">
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
            <div className="form-groups">
              <label>Vehicle Type:</label>
              <input
                type="text"
                name="vehicleType"
                value={editingTransport.vehicleType}
                onChange={handleTransportChange}
              />
            </div>
            <div className="form-groups">
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
            <div className="form -groups">
  <label>Vehicle Model:</label>
  <input
    type="text"
    name="vehicleModel"
    value={editingTransport.vehicleModel}
    onChange={handleTransportChange}
  />
</div>

<div className="form-groups"> 
  <label>No of Passengers:</label>
  <input
    type="text"
    name="numPassengers"
    value={editingTransport.noOfPassengers}
    onChange={handleTransportChange}
  />
</div>

{/* Add Pickup Date */}
<div className="form-groups">
        <label>Pickup Date:</label>
        <input
          type="date"
          name="pickupDate"
          value={editingTransport.pickupDate}
          onChange={handleTransportChange}
          min={new Date().toISOString().split("T")[0]} // Prevent past dates
        />
      </div>
{/* Add Dropoff Date */}
<div className="form-groups">
        <label>Dropoff Date:</label>
        <input
          type="date"
          name="dropoffDate"
          value={editingTransport.dropoffDate}
          onChange={handleTransportChange}
          min={new Date().toISOString().split("T")[0]} // Prevent past dates
        />
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
            <div className="form-groups"> 
              <label className="adults">Adults:</label>
              <input
                type="number"
                name="adults"
                value={editingHotelBooking.adults}
                onChange={handleHotelBookingChange}
              />
            </div>
            <div className="form-groups">
              <label>Children:</label>
              <input
                type="number"
                name="children"
                value={editingHotelBooking.children}
                onChange={handleHotelBookingChange}
              />
            </div>
            <div className="form-groups">
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
             {/* Tour Guide Selection */}
      <div className="form-groups">
        <label>Tour Guide:</label>
        <select
          name="tourGuide"
          value={editingTourPlan.tourGuide}
          onChange={handleTourPlanChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {/* Guide Language (Only enabled if Tour Guide is Yes) */}
      <div className="form-groups">
        <label>Guide Language:</label>
        <select
          type="text"
          name="guideLanguage"
          value={editingTourPlan.guideLanguage || ""}
          onChange={handleTourPlanChange}
          disabled={editingTourPlan.tourGuide !== "Yes"} // Disable if tourGuide is "No"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Sinhala">Sinhala</option>
          <option value="Tamil">Tamil</option>
        </select>
      </div>
            
            <button className="update-form-button" type="submit">Update Tour Plan</button>
            <button className="cancel-button "type="button" onClick={closeUpdateForms}>Cancel</button>
          </form>
        </div>
      )}
    
    </div>
    );
};


export default PendingTours;
