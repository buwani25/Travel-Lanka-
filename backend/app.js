const express = require("express");
const mongoose = require("mongoose");
const router = require("./transportMS/RouteTMS/VehicleRoute");
const app = express();
const cors = require("cors");
//Middleware
app.use(express.json());
app.use(cors()); // Adjust frontend port if needed
app.use("/vehicles",router);


mongoose.connect("mongodb+srv://accomodation_manager:bVxLYSNd9K0mbBus@cluster0.dch3o.mongodb.net/tourism_management")
.then(()=>console.log("connected to MongoDb"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));