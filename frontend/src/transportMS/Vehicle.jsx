import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Vehicle(props) {
    const {_id,VehicleID, VehicleType, Model, VehicleNumber, Capacity, FuelType } = props.Vehicle;

    const history = useNavigate();

    const deleteHandler = async()=>{
      await axios.delete(`http://localhost:5000/vehicles/${_id}`).then(res=>res.data)
      .then(()=>history("/"))
      .then(()=>history("/Vehicles"));
    }
    return (
      <div>
        <br />
        <h2>ID: {_id}</h2>
        <h2>Vehicle ID: {VehicleID}</h2>
        <h3>Vehicle Type: {VehicleType}</h3>
        <p>Model: {Model}</p>
        <p>Vehicle Number: {VehicleNumber}</p>
        <p>Capacity: {Capacity}</p>
        <p>Fuel Type: {FuelType}</p>
        <Link to={`/Vehicles/${_id}`}>Update</Link> {/* ✅ Fixing Dynamic Link */}
        <button onClick={deleteHandler}>Delete</button>
      </div>
    );
  }
  
  export default Vehicle;
  