import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HotelRegistration.css";
import "./Dashboard.css";

export default function HotelRegistrationForm() {

  const history = useNavigate();
  
  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    type: "",
    email: "",
    phone: "",
    description: "",
    rooms: [],
  });
  
    const [roomType, setRoomType] = useState("");
    const [price, setPrice] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState("");
  
    const hotelTypes = ["Resorts", "Villa", "Hotel", "Motel", "Guest House"];
    const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Family"];

    const validateForm = () => {
      
      let errorMessages = [];

      if (!hotel.name.trim()) errorMessages.push("Hotel name is required");
      if (!hotel.city.trim()) errorMessages.push("City is required");
      if (!hotel.type) errorMessages.push("Select a hotel type");
      if (!hotel.email.match(/^\S+@\S+\.\S+$/)) errorMessages.push("Invalid email format");
      if (!hotel.phone.match(/^\d{10}$/)) errorMessages.push("Phone number must be 10 digits");
      if (!hotel.description.trim()) errorMessages.push("Description is reqired");
      if (hotel.rooms.length === 0) errorMessages.push("Atleast one room must be added");

      if (errorMessages.length > 0) {
        alert(errorMessages.join("\n")); // Show alert box with errors
        return false;
      }

      return true;
    };

    const handleRoomChange = (e) => {
      if (e.target.name === "roomType") setRoomType(e.target.value);
      if (e.target.name === "price") setPrice(e.target.value);
      if (e.target.name === "numberOfRooms") setNumberOfRooms(e.target.value);
    };
  
    const addRoom = () => {

      let errorMessages = [];

      if (!roomType) {
        errorMessages.push("Select a room type");
      }
      if (!price || price <= 0) {
        errorMessages.push("Enter a valid price");
      }
      if (!numberOfRooms || numberOfRooms <= 0) {
        errorMessages.push("Enter a valid number of rooms");
      }

      if (errorMessages.length > 0) {
        alert(errorMessages.join("\n")); // Show alert box with errors
        return false;
      }

      if (roomType && price  && numberOfRooms ) {
        const newRoom = { type: roomType, price, numberOfRooms: numberOfRooms };
        setHotel((prevState) => ({
          ...prevState,
          rooms: [...prevState.rooms, newRoom], // Add new room to the rooms array
        }));
        setRoomType("");
        setPrice("");
        setNumberOfRooms("");
      }
    };

    const handleChange = (e) => {
      setHotel((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      sendRequest().then(()=>history('/hotels'));
      //navigate('/hotels');
    };

    const sendRequest = async () => {
      await axios.post("http://localhost:5000/hotels", {
        hotelName: hotel.name,  
        location: hotel.city,   
        hotelType: hotel.type,  
        description: hotel.description,
        rooms: hotel.rooms.map(room => ({
          roomType: room.type,
          pricePerNight: Number(room.price),
          numberOfRooms: Number(room.numberOfRooms),
        })),
        contactInfo: {
          email: hotel.email,  
          phone: hotel.phone   
        }
      });
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
        <div className="form-title"><h3>Hotel Registration</h3></div>
        <br></br>

      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Hotel Name:</label>
        <input type="text" name="name" value={hotel.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>City:</label>
        <input type="text" name="city" value={hotel.city} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Hotel Type:</label>
        <select name="type" value={hotel.type} onChange={handleChange}>
          <option value="">Select</option>
          {hotelTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Room Type:</label>
        <select name="roomType" value={roomType} onChange={handleRoomChange}>
          <option value="">Select</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Price per Night:</label>
        <input name="price" type="number" value={price} onChange={handleRoomChange} />
      </div>

      <div className="form-group">
        <label>Number of Rooms:</label>
        <input type="number" name="numberOfRooms" min="1" value={numberOfRooms} onChange={handleRoomChange} />
      </div>

      <button type="button" onClick={addRoom}>Add Room</button>
      
      <div className="room-list">
        <h3>Added Room Types & Prices:</h3>
        <ul>
        {hotel.rooms.length > 0 ? (
          hotel.rooms.map((room, index) => (
            <li key={index}>
            {room.type} - Rs.{room.price} per night (x{room.numberOfRooms} rooms)
            </li>
          ))
        ) : (
          <li>No rooms added yet.</li>
        )}
        </ul>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={hotel.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input type="text" name="phone" value={hotel.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={hotel.description} onChange={handleChange}></textarea>
      </div>

      <button type="submit" className="register-button">Register</button>
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

