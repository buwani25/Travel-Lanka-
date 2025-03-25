import Home from './Home.jsx';
import ContactUs from './ContactUs.jsx';
import AboutUs from './AboutUs.jsx';

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardTMS from './transportMS/DashboardTMS.jsx';
import Vehicle from './transportMS/Vehicle.jsx';
import Vehicles from './transportMS/Vehicles.jsx';
import Register from './transportMS/Register.jsx';
import UpdateVehicle from './transportMS/UpdateVehicle.jsx';

import Dashboard from './hotel/Dashboard.jsx';
import HotelDisplay from './hotel/HotelDisplay.jsx';
import HotelRegistrationForm from './hotel/HotelRegistrationForm.jsx';
import HotelBooking from './hotel/HotelBooking.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home page */}
        <Route path="/contact-us" element={<ContactUs />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 

        <Route path="/DashboardTMS" element={<DashboardTMS />} /> {/* Route for Transport page */}
        <Route path="/Vehicles" element={<Vehicles />} /> {/* Route for Transport page */}
        <Route path="/Vehicle" element={<Vehicle />} /> {/* Route for Home page */}
        <Route path="/Register" element={<Register />} /> {/* Route for Home page */}
        <Route path="/Vehicles/:id" element={<UpdateVehicle />} />

        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/hotels" element={<HotelDisplay/>}></Route>
        <Route path="/registerhotel" element={<HotelRegistrationForm/>}></Route>
        <Route path="/hotelbookings" element={<HotelBooking/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
