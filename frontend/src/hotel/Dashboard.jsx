import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard(){

     

    const [overview, setOverview] = useState({
        hotels: 0,
        pendingBookings: 35,
        advertisements: 15,
    });

    const [customerRequests, setCustomerRequests] = useState([]);

    useEffect(() => {
      const fetchHotelCount = async() => {
        const response = await fetch("http://localhost:5000/api/hotels/hotel-count");
        const data = await response.json();
        setOverview((prevState) => ({
          ...prevState,
          hotels: data.hotelCount,
        }))
      } 

      const fetchCustomerRequests = async() => {
        const response = await fetch("http://localhost:5000/api/hotel-booking");
        const data = await response.json();
        setCustomerRequests(data);
      }

      fetchHotelCount();
      fetchCustomerRequests();
    },[]);

    return(

        <div className="dashboard-container">

        <header>
        <div className="logo"><i>Travel Lanka</i></div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
        <a href="#" className="cta-button">Logout</a>
        </header>

        <div className="sidebar">
      
          <div className="menu-title">Menu</div>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/hotelbookings"><a href="#">Bookings</a></Link></li>
            <li><a href="#">Advertisements</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        <div className="main-content">
          <div className="header">
            <h1>Accommodation Dashboard</h1>
          </div>

          <h2 className="overview-header">Overview</h2>
          <div className="grid">
            <div className="card">
              <h2>{overview.hotels}</h2>
              <p>Registered Hotels</p>
            </div>
            <div className="card">
              <h2>{overview.pendingBookings}</h2>
              <p>Pending Bookings</p>
            </div>
            <div className="card">
              <h2>{overview.advertisements}</h2>
              <p>Active Advertisements</p>
            </div>
          </div>

          <br></br>

          <h2 className="section-header">Customer Requests</h2>
          <br></br>
          <div className="customer-requests">
          {customerRequests.map((request, index) => (
            <div className="customer-card" key={index}>
              <h3>Tour ID: {request.tourId}</h3>
              <p><strong>Destination 1:</strong> {request.firstDestination} ({new Date(request.firstFromDate).toLocaleDateString()} - {new Date(request.firstToDate).toLocaleDateString()})</p>
              <p><strong>Destination 2:</strong> {request.secondDestination} ({new Date(request.secondFromDate).toLocaleDateString()} - {new Date(request.secondToDate).toLocaleDateString()})</p>
              <p><strong>Guests:</strong> {request.adults} Adults, {request.children} Children</p>
              <p><strong>Rooms:</strong> {request.rooms}</p>
              <p><strong>Hotel Type:</strong> {request.hotelType}</p>
              <p><strong>Budget:</strong> Rs.{request.budget}</p>

              <button className="proceed-button" onClick={() => alert(`Proceeding with booking for Tour ID: ${request.tourId}`)}>
                  Proceed
              </button>
            </div>
          ))}
        </div> 
          
         </div>




         <footer>
        <div className="footer-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
        <div className="footer-line"></div>
        <div className="footer-copy">&copy; 2024 Tourism Management System</div>
      </footer>

        </div>
    )
}