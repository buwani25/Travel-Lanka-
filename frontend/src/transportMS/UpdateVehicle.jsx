import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateVehicle() {
    const [inputs, setInputs] = useState({
        VehicleID: "",
        VehicleType: "",
        Model: "",
        VehicleNumber: "",
        Capacity: "",
        FuelType: ""
    });

    const { id } = useParams(); // ✅ Correct way to extract id
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/vehicles/${id}`);
                console.log("Fetched data:", res.data); // Debugging
                if (res.data.vehicle) {
                    setInputs(res.data.vehicle); // ✅ Correct property name
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
            <h1>Update Vehicle</h1>
            {Object.keys(inputs).length === 0 ? (
                <p>Loading...</p> // ✅ Prevents empty fields issue
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Vehicle ID</label>
                    <br />
                    <input type="text" name="VehicleID" onChange={handleChange} value={inputs.VehicleID || ""} required readOnly />
                    <br />
                    <label>Vehicle Type</label>
                    <br />
                    <input type="text" name="VehicleType" onChange={handleChange} value={inputs.VehicleType || ""} required />
                    <br />
                    <label>Model</label>
                    <br />
                    <input type="text" name="Model" onChange={handleChange} value={inputs.Model || ""} required />
                    <br />
                    <label>Vehicle Number</label>
                    <br />
                    <input type="text" name="VehicleNumber" onChange={handleChange} value={inputs.VehicleNumber || ""} required />
                    <br />
                    <label>Capacity</label>
                    <br />
                    <input type="text" name="Capacity" onChange={handleChange} value={inputs.Capacity || ""} required />
                    <br />
                    <label>Fuel Type</label>
                    <br />
                    <input type="text" name="FuelType" onChange={handleChange} value={inputs.FuelType || ""} required />
                    <br />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}

export default UpdateVehicle;
