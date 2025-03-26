import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Driver({ driver, index }) {
    const {_id,
        driverCompanyID,
        FirstName,
        LastName,
        Age,
        ContactNumber,
        Address,
        LicenceNumber,
        license_expiry_date,
        license_category,
    } = driver;


    const history=useNavigate();

    const deleteHandler=async()=>{
        (await axios.delete(`http://localhost:5000/drivers/${_id}`))
        .then(res=>res.data)
        .then(()=>history("/"))
        .then(()=>history("/Drivers"))
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{driverCompanyID}</td>
            <td>{FirstName}</td>
            <td>{LastName}</td>
            <td>{Age}</td>
            <td>{ContactNumber}</td>
            <td>{Address}</td>
            <td>{LicenceNumber}</td>
            <td>{new Date(license_expiry_date).toLocaleDateString()}</td>
            <td>{license_category}</td>
            <td>
            <button><Link to={`/Drivers/${_id}`} className="Driver-link1">Update</Link> </button>|
                <button onClick={deleteHandler} className="dltt">Delete</button>
            </td>
        </tr>
    );
}

export default Driver;
