import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import "./Dashboard.css";
import "./HotelDisplay.css";

const URL = "http://localhost:5000/hotelBookings";

const fetchHandler = async() => {
  return await axios.get(URL).then((res) => res.data);
}

export default function HotelBooking() {

  const [hotelBookings,setHotelBookings] = useState([]);

  useEffect(() => {
          fetchHandler().then((data) => setHotelBookings(data.hotelBookings));
  },[])

  const deleteHotelBooking = (id) => {
    axios.delete(`${URL}/${id}`).then(() => {
        setHotelBookings((prevHotelBookings) => prevHotelBookings.filter((hotelBookings) => hotelBookings._id !== id));
    });
  }

  const downloadPDF = () => {
          const doc = new jsPDF();
          doc.text("Pending Bookings", 14, 10);
  
          const tableColumn = ["Trip ID", "Hotel Name", "Checking Date", "Checkout Date", "Room Type", "Number of Rooms", "Total Cost"];
            
          const tableRows = hotelBookings.map(booking => {
            return [
              booking.TripID,
              booking.HotelName,
              booking.CheckingDate.split("T")[0], 
              booking.CheckoutDate.split("T")[0], 
              booking.RoomType,
              booking.NumberOfRooms,
              `Rs.${booking.TotalCost}`
            ]
          })

          autoTable(doc, {
              head: [tableColumn],
              body: tableRows,
              startY: 20
          });
          doc.save("hotel_bookings.pdf");
      };

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
            <li><Link to="/hotels">Hotels</Link></li>
            <li><a href="#">Bookings</a></li>
            <li><a href="#">Advertisements</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        <div className="main-content">
        <div className="header-container">
                <h3 style={{ textAlign: "left", marginLeft: "0" }}>Pending Bookings</h3>

                <button className="add-hotel-btn"><Link to="/hotelbookingform" >Add a booking</Link></button>
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
                  {hotelBookings.length > 0 ? (
                    hotelBookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.TripID}</td>
                        <td>{booking.HotelName}</td>
                        <td>{booking.CheckingDate.split("T")[0]}</td>
                        <td>{booking.CheckoutDate.split("T")[0]}</td>
                        <td>{booking.RoomType}</td>
                        <td>{booking.NumberOfRooms}</td>
                        <td>Rs.{booking.TotalCost}</td>
                        <td>
                          <button className="delete-btn" onClick={() => deleteHotelBooking(booking._id)}>Delete </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>No bookings available</td>
                  </tr>
                )}
                </tbody>
            </table>
            <br></br>
            <button className="download-btn" onClick={downloadPDF}>Download PDF</button>  
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

