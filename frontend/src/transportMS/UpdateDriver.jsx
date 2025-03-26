import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./UpdateDriver.css"; 

function UpdateDriver() {
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

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/drivers/${id}`);
                if (res.data.driver) {
                    setInputs(res.data.driver);
                }
            } catch (error) {
                console.error("Error fetching driver:", error);
            }
        };
        fetchDriver();
    }, [id]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/drivers/${id}`, {
                ...inputs,
                Age: Number(inputs.Age),
            });
            navigate("/Drivers");
        } catch (error) {
            console.error("Error updating driver:", error);
            alert("Failed to update driver.");
        }
    };

    return (
        <div className="page-container">
        <div className="content-wrap">
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
          </header><br></br><br></br>
        <div class="form-wrapper">
        <div class="form-container">
            <h1>Update Driver</h1>
            {Object.keys(inputs).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label>Vehicle Company ID</label>
                        <input type="text" name="driverCompanyID" className="I1" placeholder="Company ID" onChange={handleChange} value={inputs.driverCompanyID || ""} required />
                        <label>First Name</label>
                        <input type="text" name="FirstName" className="I1" placeholder="First Name" onChange={handleChange} value={inputs.FirstName || ""} required />
                        <label>Last Name</label>
                        <input type="text" name="LastName" className="I1" placeholder="Last Name" onChange={handleChange} value={inputs.LastName || ""} required />
                        <label>Age</label>
                        <input type="number" name="Age" className="I1" placeholder="Age" onChange={handleChange} value={inputs.Age || ""} required />
                        <label>Contact Number</label>
                        <input type="text" name="ContactNumber" className="I1" placeholder="Contact Number" onChange={handleChange} value={inputs.ContactNumber || ""} required />
                        <label>Address</label>
                        <input type="text" name="Address" className="I1" placeholder="Address" onChange={handleChange} value={inputs.Address || ""} required />
                        <label>Licence Number</label>
                        <input type="text" name="LicenceNumber" className="I1" placeholder="Licence Number" onChange={handleChange} value={inputs.LicenceNumber || ""} required />
                        <label>Licence Expiry Date</label>
                        <input type="date" name="license_expiry_date" className="I1" onChange={handleChange} value={inputs.license_expiry_date?.slice(0, 10) || ""} required />
                        <label>Licence Category</label>
                        <input type="text" name="license_category" className="I1" placeholder="Licence Category" onChange={handleChange} value={inputs.license_category || ""} required />
                        <br></br><br></br>
                        <button type="submit" className="subbb">Update</button>
                    </div>
                </form>
            )}
        </div></div></div>
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
</footer></div>
    );
}

export default UpdateDriver;
