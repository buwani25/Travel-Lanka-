import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 // Reuse your vehicle CSS if needed

function AddDriver() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        driverCompanyID: "",
        FirstName: "",
        LastName: "",
        Age: "",
        ContactNumber: "",
        Address: "",
        LicenceNumber: "",
        license_expiry_date: "",
        license_category: "",
    });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/drivers", {
                ...inputs,
                Age: Number(inputs.Age),
            });
            navigate("/Drivers");
        } catch (err) {
            console.error("Driver registration failed:", err);
            alert("Failed to register driver. See console for details.");
        }
    };

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
    <br></br>
    </div>
            <div className="form-container">
                <h1>Register New Driver</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Driver Company ID</label>
                        <input type="text" name="driverCompanyID" className="I1"  onChange={handleChange} value={inputs.driverCompanyID} required />
                        <label>First Name</label>
                        <input type="text" name="FirstName" className="I1"  onChange={handleChange} value={inputs.FirstName} required />
                        <label>Last Name</label>
                        <input type="text" name="LastName" className="I1"  onChange={handleChange} value={inputs.LastName} required />
                        <label>Age</label>
                        <input type="number" name="Age" className="I1"  onChange={handleChange} value={inputs.Age} required />
                        <label>Contact Number</label>
                        <input type="text" name="ContactNumber" className="I1"  onChange={handleChange} value={inputs.ContactNumber} required />
                        <label>Address</label>
                        <input type="text" name="Address" className="I1"  onChange={handleChange} value={inputs.Address} required />
                        <label>Licence Number</label>
                        <input type="text" name="LicenceNumber" className="I1"  onChange={handleChange} value={inputs.LicenceNumber} required />
                        <label>Licence Expiry Date</label>
                        <input type="date" name="license_expiry_date" className="I1" onChange={handleChange} value={inputs.license_expiry_date} required />
                        <label>Licence Category</label>
                        <input type="text" name="license_category" className="I1"  onChange={handleChange} value={inputs.license_category} required />
                        <br /><br />
                        <button type="submit" className="Reg">Register</button>
                    </div>
                </form>
            </div>
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
    );
}

export default AddDriver;
