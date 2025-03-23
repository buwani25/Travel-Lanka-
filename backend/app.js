const express = require("express");
const mongoose = require("mongoose");
const routerTMS = require("./transportMS/RouteTMS/VehicleRoute");
const routerHMS = require("./hotelMS/Routes/hotelRoute");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors()); // Adjust frontend port if needed
app.use("/vehicles",routerTMS);
app.use("/api/hotels",routerHMS);
app.use("/hotels",routerHMS);


mongoose.connect("mongodb+srv://accomodation_manager:bVxLYSNd9K0mbBus@cluster0.dch3o.mongodb.net/tourism_management")
.then(()=>console.log("connected to MongoDb"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));