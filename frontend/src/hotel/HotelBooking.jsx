import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Dashboard.css";
import "./HotelDisplay.css";

export default function HotelBooking() {
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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/hotels"><a href="#">Hotels</a></Link></li>
            <li><a href="#">Bookings</a></li>
            <li><a href="#">Advertisements</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        <div className="main-content">
        <div className="header-container">
                <h3 style={{ textAlign: "left", marginLeft: "0" }}>Pending Bookings</h3>

                <button className="add-hotel-btn"><Link to="/registerhotel" >Add a booking</Link></button>
        </div>
         
            <table className="hotel-table">
                <thead>
                    <tr>
                        <th>Trip ID</th>
                        <th>Hotel Name</th>
                        <th>Checking Date</th>
                        <th>Checkout Date</th>
                        <th>Room Type</th>
                        <th>Number of Rooms</th>
                        <th>Total Cost</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
            <br></br>
            <button className="download-btn" >Download PDF</button>  
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

