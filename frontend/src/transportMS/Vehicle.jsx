import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Vehicles.css"; // Import external CSS

function Vehicle(props) {
    const { _id, VehicleID, VehicleType, Model, VehicleNumber, Capacity, FuelType,VehicleStatus } = props.Vehicle;
    const history = useNavigate();

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/vehicles/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/Vehicles"));
    };

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{VehicleID}</td>
            <td>{VehicleType}</td>
            <td>{Model}</td>
            <td>{VehicleNumber}</td>
            <td>{Capacity}</td>
            <td>{FuelType}</td>
            <td>{VehicleStatus}</td>
            <td>
                <button><Link to={`/Vehicles/${_id}`} className="vehicle-link1">Update</Link> </button>|
                <button onClick={deleteHandler} className="vehicle-button">Delete</button>
            </td>
        </tr>
    );
}

export default Vehicle;
