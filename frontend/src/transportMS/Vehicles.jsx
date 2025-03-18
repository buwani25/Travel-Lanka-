import { useState, useEffect } from "react";
import axios from "axios";
import Vehicle from "./Vehicle";
import { Link } from "react-router-dom";


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

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data.vehicles) {
        setVehicles(data.vehicles); // Set vehicles state
      }
    });
  }, []);

  return (
    <div>
     <button>
  <Link to="/Register" style={{ textDecoration: "none", color: "inherit" }}>
    Register
  </Link>
</button>
      <h1>Vehicle Details Displaying</h1>
      <div>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, i) => (
            <div key={i}>
              <Vehicle Vehicle={vehicle} />
            </div>
          ))
        ) : (
          <p>No vehicles found.</p> // Message if no data is found
        )}
      </div>
    </div>
  );
}

export default Vehicles;
