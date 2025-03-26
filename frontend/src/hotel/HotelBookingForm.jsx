import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HotelRegistration.css";
import "./Dashboard.css";

export default function HotelBookingForm() {

  const history = useNavigate();

  const [hotelBooking, setHotelBookings] = useState({
    id: "",
    hotelName: "",
    checking: "",
    checkout: "",
    roomType: "",
    numberOfRooms: "",
    cost: "",
  });

  const [pdfFile, setPdfFile] = useState(null); // Store PDF separately

  const handleChange = (e) => {
    setHotelBookings((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]); // Store file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(()=>history('/hotelBookings'));
    //navigate('/hotels');
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("TripID", hotelBooking.id);
    formData.append("HotelName", hotelBooking.hotelName);
    formData.append("CheckingDate", hotelBooking.checking);
    formData.append("CheckoutDate", hotelBooking.checkout);
    formData.append("RoomType", hotelBooking.roomType);
    formData.append("NumberOfRooms", hotelBooking.numberOfRooms);
    formData.append("TotalCost", hotelBooking.cost);
    formData.append("PdfDocument", pdfFile); 

    const response = await axios.post("http://localhost:5000/hotelBookings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
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
            <li><a href="#">Hotels</a></li>
            <li><a href="#">Bookings</a></li>
            <li><a href="#">Advertisements</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        <div className="main-content">
        <div className="hotel-registration">
        <div className="form-title"><h3>Add Hotel Booking</h3></div>
        <br></br>

      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Trip ID:</label>
        <input type="text" name="id" value={hotelBooking.id} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Hotel Name:</label>
        <input type="text" name="hotelName" value={hotelBooking.hotelName} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Checking Date:</label>
        <input name="checking" type="date"  value={hotelBooking.checking} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Checkout Date:</label>
        <input type="date" name="checkout"  value={hotelBooking.checkout} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Room Type:</label>
        <input type="text" name="roomType" value={hotelBooking.roomType} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Number of rooms:</label>
        <input type="text" name="numberOfRooms" value={hotelBooking.numberOfRooms} onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label>Total Cost:</label>
        <input type="number" name="cost" value={hotelBooking.cost} onChange={handleChange}/>
      </div>

      {/* File Input for PDF Upload */}
      <div className="form-group">
        <label>Upload PDF Document:</label>
        <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange} />
      </div>


      <button type="submit" className="booking-button">Submit</button>
      </form>

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