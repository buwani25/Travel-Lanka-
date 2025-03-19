import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import external CSS

function Register() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        VehicleID: "",
        VehicleType: "",
        Model: "",
        VehicleNumber: "",
        Capacity: "",
        FuelType: "",
        VehicleStatus:"",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history("/Vehicles"));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/vehicles", {
            VehicleID: String(inputs.VehicleID),
            VehicleType: String(inputs.VehicleType),
            Model: String(inputs.Model),
            VehicleNumber: String(inputs.VehicleNumber),
            Capacity: String(inputs.Capacity),
            FuelType: String(inputs.FuelType),
            VehicleStatus: String(inputs.VehicleStatus),
        }).then((res) => res.data);
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
    <div class="form-container">
            <h1>Register New Vehicle</h1>
            <form onSubmit={handleSubmit} id="contactForm">
            <div className="form-group">
                <label>Vehicle ID</label>
                <input type="text" name="VehicleID" className="I1" onChange={handleChange} value={inputs.VehicleID} required />
                <label>Vehicle Type</label>
                <input type="text" name="VehicleType" className="I1" onChange={handleChange} value={inputs.VehicleType} required />
                <label>Model</label>
                <input type="text" name="Model" className="I1" onChange={handleChange} value={inputs.Model} required />
                <label>Vehicle Number</label>
                <input type="text" name="VehicleNumber" className="I1" onChange={handleChange} value={inputs.VehicleNumber} required />
                <label>Capacity</label>
                <input type="text" name="Capacity" className="I1" onChange={handleChange} value={inputs.Capacity} required />
                <label>Fuel Type</label>
                <input type="text" name="FuelType" className="I1" onChange={handleChange} value={inputs.FuelType} required />
                <label>Vehicle Status</label>
                <input type="text" name="VehicleStatus" className="I1" onChange={handleChange} value={inputs.VehicleStatus} required />
                <br></br>
                <br></br>
                <button type="submit">Register</button>
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

export default Register;
