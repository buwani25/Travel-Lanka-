import { useState, useEffect,useRef } from "react";
import axios from "axios";
import Vehicle from "./Vehicle";
import { Link } from "react-router-dom";
import "./Vehicles.css"; // Import external CSS
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const URL = "http://localhost:5000/vehicles";

const fetchHandler = async () => {
    try {
        const res = await axios.get(URL);
        return res.data; // Ensure it returns an object with `vehicles` as an array
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return { vehicles: [] }; // Return empty array if error occurs
    }
};

function Vehicles() {
    const [vehicles, setVehicles] = useState([]); // Initialize as an empty array
    const pdfRef = useRef();

    useEffect(() => {
        fetchHandler().then((data) => {
            if (data.vehicles) {
                setVehicles(data.vehicles); // Set vehicles state
            }
        });
    }, [])

    const handleDownloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
            pdf.save("vehicles_report.pdf"); // Save the PDF
        });
    };

    const [searchQuery,setSearchQuery] = useState("");
    const[noResults,setNoResults]= useState(false);

    const handleSearch =()=>{
        fetchHandler().then((data)=>{
            const filteredVehicles=data.vehicles.filter((vehicle)=>
                Object.values(vehicle).some((field)=>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            ))
            setVehicles(filteredVehicles);
            setNoResults(filteredVehicles.length===0);
        });
    }
    return (
        <div>
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
                    <li><Link to="/Vehicle">Add Vehicle</Link></li>
                    <li><Link to="/Vehicles">Vehicles</Link></li>
                    <li><a href="#">Drivers</a></li>
                    <li><a href="#">Bookings</a></li>
                    <li><a href="#">Maintenance</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>
            </nav>
          </aside>
        </div>
        <div>
            <button className="btn1">
                <Link to="/Register" style={{ textDecoration: "none", color: "inherit" }}>
                    Register New Vehicle
                </Link>
            </button>
            <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" name ="search" className="searchb" placeholder="Search vehicle"/>
            <button onClick={handleSearch} className="searchb1">Search</button><br></br><br></br>

            {noResults ? (
                <div><p>No users found</p></div>
            ):(
            <div ref={pdfRef} style={{ padding: "10px", backgroundColor: "#fff" }}>
            <div className="headingg"><h2 >Vehicle Details</h2></div>
            <table className="vehicle-table">
                <tbody>
                    <tr className="vehicle-header-row">
                        <td>#</td>
                        <td>Vehicle ID</td>
                        <td>Vehicle Type</td>
                        <td>Model</td>
                        <td>Vehicle Number</td>
                        <td>Capacity</td>
                        <td>Fuel Type</td>
                        <td>VehicleStatus</td>
                        <td>Actions</td>
                    </tr>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle, index) => (
                            <Vehicle key={index} index={index} Vehicle={vehicle} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            )}
            <br></br>
            <button onClick={handleDownloadPDF} className="dwnbtn">Download Report</button>
            </div>
            <div class="container">
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

export default Vehicles;
