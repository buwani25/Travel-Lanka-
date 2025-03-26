import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./UpdateVehicle.css"; 

function UpdateVehicle() {
    const [inputs, setInputs] = useState({
        VehicleID: "",
        VehicleType: "",
        Model: "",
        VehicleNumber: "",
        Capacity: "",
        FuelType: "",
        VehicleStatus:""
    });

    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/vehicles/${id}`);
                console.log("Fetched data:", res.data); 
                if (res.data.vehicle) {
                    setInputs(res.data.vehicle); 
                }
            } catch (error) {
                console.error("Error fetching vehicle:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/vehicles/${id}`, inputs);
            navigate('/Vehicles');
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
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
        </div>
        <div class="form-wrapper">
        <div class="form-container">
            <h1>Update Vehicle</h1>
            {Object.keys(inputs).length === 0 ? (
                <p>Loading...</p> 
            ) : (
                <form onSubmit={handleSubmit} id="contactForm">
                    <div className="form-group">
                    <label>Vehicle ID</label>

                    <input type="text" name="VehicleID" className="I1" onChange={handleChange} value={inputs.VehicleID || ""} required readOnly />

                    <label>Vehicle Type</label>

                    <input type="text" name="VehicleType" className="I1" onChange={handleChange} value={inputs.VehicleType || ""} required />

                    <label>Model</label>

                    <input type="text" name="Model" className="I1" onChange={handleChange} value={inputs.Model || ""} required />

                    <label>Vehicle Number</label>

                    <input type="text" name="VehicleNumber" className="I1" onChange={handleChange} value={inputs.VehicleNumber || ""} required />

                    <label>Capacity</label>

                    <input type="text" name="Capacity" className="I1" onChange={handleChange} value={inputs.Capacity || ""} required />

                    <label>Fuel Type</label>

                    <input type="text" name="FuelType" className="I1" onChange={handleChange} value={inputs.FuelType || ""} required />

                    <label>Vehicle Status</label>

                    <input type="text" name="VehicleStatus" className="I1" onChange={handleChange} value={inputs.VehicleStatus || ""} required />
                    <br></br>
                    <br></br>
                    <button type="submit" className="subbb">Update</button>
                    </div>
                </form>
            )}
            </div>
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

export default UpdateVehicle;
