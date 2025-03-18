const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    VehicleID:{
        type: String, //data type
        required:true, //validate
    },
    VehicleType:{
        type: String, //data type
        required:true, //validate
    },
    Model:{
        type: String, //data type
        required:true, //validate
    },
    VehicleNumber:{
        type: String, //data type
        required:true, //validate
    },
    Capacity:{
        type: Number, //data type
        required:true, //validate
    },
    FuelType:{
        type: String, //data type
        required:true, //validate
    }
});

module.exports=mongoose.model(
    "vehicleModel", //file name
    vehicleSchema,"Vehicles"  //function schema
)