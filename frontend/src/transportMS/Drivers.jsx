import { useState, useEffect } from "react";
import axios from "axios";
import Driver from "./Driver";
import './Drivers.css';
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/drivers";

const fetchHandler = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return { drivers: [] };
    }
};

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetchHandler().then((data) => {
            if (data.drivers) {
                setDrivers(data.drivers);
            }
        });
    }, []);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredDrivers = data.drivers.filter((driver) =>
                Object.values(driver).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setDrivers(filteredDrivers);
            setNoResults(filteredDrivers.length === 0);
        });
    };

    return (
        <div className="page-container">
  <div className="content-wrap">
            <div class="container">
          <header>
              <div class="logo"><i>Travel Lanka</i></div>
              <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
              </nav>
                  <a href="#" class="cta-button">Logout</a>
          </header>
          <aside class="dashboard-sidebar">
            <nav>
                <ul>
                <li><Link to="/DashboardTMS">Dashboard</Link></li>
                    <li><Link to="/Vehicles">Vehicles</Link></li>
                    <li><Link to="/Drivers">Drivers</Link></li>
                    <li><a href="#">Bookings</a></li>
                    <li><a href="#">Driver Allocations</a></li>
                    <li><a href="#">Maintenance</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>
            </nav>
          </aside>
        </div>
            <button className="btn1">
                <Link to="/AddDriver" style={{ textDecoration: "none", color: "inherit" }}>
                    Register New Driver
                </Link>
            </button>
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="searchb"
                placeholder="Search driver"
            />
            <button onClick={handleSearch} className="searchb1">Search</button>
            <br /><br />

            {noResults ? (
                <div><p>No drivers found.</p></div>
            ) : (
                <div style={{ padding: "10px", backgroundColor: "#fff" }}>
                    <div className="headingg"><h2 className="headinggg">Driver Details</h2></div>
                    <table className="vehicle-table">
                        <tbody>
                            <tr className="vehicle-header-row">
                                <td>#</td>
                                <th>Company ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Contact Number</th>
                                <th>Address</th>
                                <th>License No</th>
                                <th>Licence Expiry Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            {drivers.map((driver, index) => (
                                <Driver key={index} index={index} driver={driver} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <footer>
    <div class="footer-nav">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </div>
    <div class="footer-line"></div>
    <div class="footer-copy">
        &copy; 2024 Tourism Management System
    </div>
</footer>
</div>
</div>
    );
}

export default Drivers;
