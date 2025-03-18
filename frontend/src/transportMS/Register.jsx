import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        VehicleID: "",
        VehicleType: "",
        Model: "",
        VehicleNumber: "",
        Capacity: "",
        FuelType: "",
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
        }).then((res) => res.data);
    };

    return (
        <div>
            <h1>Add Vehicles</h1>
            <form onSubmit={handleSubmit}>
                <label>Vehicle ID</label>
                <br />
                <input type="text" name="VehicleID" onChange={handleChange} value={inputs.VehicleID} required />
                <br />
                <label>Vehicle Type</label>
                <br />
                <input type="text" name="VehicleType" onChange={handleChange} value={inputs.VehicleType} required />
                <br />
                <label>Model</label>
                <br />
                <input type="text" name="Model" onChange={handleChange} value={inputs.Model} required />
                <br />
                <label>Vehicle Number</label>
                <br />
                <input type="text" name="VehicleNumber" onChange={handleChange} value={inputs.VehicleNumber} required />
                <br />
                <label>Capacity</label>
                <br />
                <input type="text" name="Capacity" onChange={handleChange} value={inputs.Capacity} required />
                <br />
                <label>Fuel Type</label>
                <br />
                <input type="text" name="FuelType" onChange={handleChange} value={inputs.FuelType} required />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
