import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import "./Dashboard.css";
import "./HotelDisplay.css";

const URL = "http://localhost:5000/hotels";

const fetchHandler = async() => {
    return await axios.get(URL).then((res) => res.data);
}

export default function HotelDisplay() {

    const [hotels,setHotels] = useState([]);
    
    useEffect(() => {
        fetchHandler().then((data) => setHotels(data.hotels));
    },[])

    const deleteHotel = (id) => {
        axios.delete(`${URL}/${id}`).then(() => {
            setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
        });
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Registered Hotels", 14, 10);

        const tableColumn = ["Hotel Name", "Location", "Hotel Type", "Room Type", "Price Per Night"];
        const tableRows = [];

        hotels.forEach(hotel => {
            hotel.rooms.forEach((room, index) => {
                const rowData = [
                    index === 0 ? hotel.hotelName : "",
                    index === 0 ? hotel.location : "",
                    index === 0 ? hotel.hotelType : "",
                    room.roomType,
                    `$${room.pricePerNight}`
                ];
                tableRows.push(rowData);
            });
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20
        });
        doc.save("hotel_details.pdf");
    };

    const[searchQuery,setSearchQuery] = useState("");
    const[noResults,setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredHotels = data.hotels.filter((hotel) => 
            Object.values(hotel).some((field) => 
            field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            ))
            setHotels(filteredHotels);
            setNoResults(filteredHotels.length === 0);
        })
    }

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
            <li><Link to="/hotelbookings"><a href="#">Bookings</a></Link></li>
            <li><a href="#">Advertisements</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        <div className="main-content">
        <div className="header-container">
                <h3 style={{ textAlign: "left", marginLeft: "0" }}>Registered Hotels</h3>

                <input className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                placeHolder="Search">
                </input>

                <button onClick={handleSearch}>Search</button>

                <button className="add-hotel-btn"><Link to="/registerhotel" >Add Hotels</Link></button>
        </div>
            {noResults ? (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>No hotels found</p>
            ) : (
        
            <table className="hotel-table">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Location</th>
                        <th>Hotel Type</th>
                        <th>Room Type</th>
                        <th>Price Per Night</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {hotels.length > 0 ? (
                            hotels.map((hotel) => (
                                hotel.rooms.map((room, index) => (
                                    <tr key={`${hotel._id}-${index}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={hotel.rooms.length}>{hotel.hotelName}</td>
                                                <td rowSpan={hotel.rooms.length}>{hotel.location}</td>
                                                <td rowSpan={hotel.rooms.length}>{hotel.hotelType}</td>
                                            </>
                                        )}
                                        <td>{room.roomType}</td>
                                        <td>Rs.{room.pricePerNight}</td>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={hotel.rooms.length} className="update-column">
                                                    <Link to={`/hotels/${hotel._id}`}><button className="update-btn">Update</button></Link>
                                                </td>
                                                <td rowSpan={hotel.rooms.length} className="delete-column">
                                                    <button className="delete-btn" onClick={() => deleteHotel(hotel._id)}>Delete</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No hotels found</td>
                            </tr>
                        )}
                </tbody>
            </table>)}
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