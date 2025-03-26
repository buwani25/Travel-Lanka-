import Home from './Home.jsx';
import ContactUs from './ContactUs.jsx';
import AboutUs from './AboutUs.jsx';

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardTMS from './transportMS/DashboardTMS.jsx';
import Vehicle from './transportMS/Vehicle.jsx';
import Vehicles from './transportMS/Vehicles.jsx';
import Register from './transportMS/Register.jsx';
import UpdateVehicle from './transportMS/UpdateVehicle.jsx';
import Drivers from './transportMS/Drivers.jsx';
import Driver from './transportMS/Driver.jsx';
import AddDriver from './transportMS/AddDriver.jsx';
import UpdateDriver from './transportMS/UpdateDriver.jsx';

import Dashboard from './hotel/Dashboard.jsx';
import HotelDisplay from './hotel/HotelDisplay.jsx';
import HotelRegistrationForm from './hotel/HotelRegistrationForm.jsx';
import HotelBooking from './hotel/HotelBooking.jsx'

import CusDashboard from './Components/CusDashboard.jsx';
import CustomerDetails from './Components/CustomerDetails.jsx';
import TransportBooking from './Components/TransportBooking.jsx';
import HotelBookingRequests from './Components/HotelBookingRequests.jsx';
import TourPlan from './Components/TourPlan.jsx';
import PendingTours from './Components/PendingTours.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/contact-us" element={<ContactUs />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 

        <Route path="/DashboardTMS" element={<DashboardTMS />} /> 
        <Route path="/Vehicles" element={<Vehicles />} /> 
        <Route path="/Vehicle" element={<Vehicle />} /> 
        <Route path="/Register" element={<Register />} /> 
        <Route path="/Vehicles/:id" element={<UpdateVehicle />} />
        <Route path="/Drivers" element={<Drivers />} />
        <Route path="/Driver" element={<Driver />} />
        <Route path="/AddDriver" element={<AddDriver/>}/>
        <Route path="/Drivers/:id" element={<UpdateDriver/>} />

        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/hotels" element={<HotelDisplay/>}></Route>
        <Route path="/registerhotel" element={<HotelRegistrationForm/>}></Route>
        <Route path="/hotelbookings" element={<HotelBooking/>}></Route>


        <Route path="/CusDashboard" element={<CusDashboard />} />
        <Route path="/cusDetails" element={<CustomerDetails />} />
        <Route path="/cusDetails/:id" element={<CustomerDetails />} />
        <Route path="/Transport/:tourId" element={<TransportBooking />} />
        <Route path="/Hotel/:tourId" element={<HotelBookingRequests />} />  
        <Route path="/Tour/:tourId" element={<TourPlan />} />  
        <Route path="/pendingtours" element={<PendingTours />} /> 
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
