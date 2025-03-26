const express = require("express");
const mongoose = require("mongoose");
const routerTMS = require("./transportMS/RouteTMS/VehicleRoute");
const routerHMS = require("./hotelMS/Routes/hotelRoute");
const routerHB = require("./hotelMS/Routes/hotelBookingRoute");
const customerRoutes = require('./customerMs/Route/customerRoute');
const transportBookingRoutes = require('./customerMs/Route/TransportRoute'); // Corrected import name
const hotelBookingRoutes = require('./customerMs/Route/HotelRoute');
const tourPlanRoutes = require('./customerMs/Route/TourPlanRoute'); 
const driverRoute=require("./transportMS/RouteTMS/driverRoute")

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors()); // Adjust frontend port if needed
app.use("/vehicles",routerTMS);
app.use("/api/hotels",routerHMS);
app.use("/hotels",routerHMS);
app.use("/hotelBookings",routerHB);
app.use('/api/transport', transportBookingRoutes); 
app.use('/api/customers', customerRoutes);
app.use('/api/hotel-booking', hotelBookingRoutes);
app.use('/api/tour-plan', tourPlanRoutes);
app.use("/drivers",driverRoute);


mongoose.connect("mongodb+srv://accomodation_manager:bVxLYSNd9K0mbBus@cluster0.dch3o.mongodb.net/tourism_management")
.then(()=>console.log("connected to MongoDb"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));