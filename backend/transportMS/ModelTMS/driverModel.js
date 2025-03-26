const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const driverSchema=new Schema({
    driverCompanyID:{
        type:String,
        required: true,
    },
    FirstName:{
        type:String,
        required: true,
    },
    LastName:{
        type:String,
        required: true,
    },
    Age:{
        type:Number,
        required: true,
    },
    ContactNumber:{
        type:String,
        required: true,
    },
    Address:{
        type:String,
        required: true,
    },
    LicenceNumber:{
        type:String,
        required: true,
        unique: true,
    },
    license_expiry_date:{
        type:Date,
        required: true,
    },
    license_category:{
        type:String,
        required: true,
    },
});

module.exports=mongoose.model("driverModel",driverSchema,"Drivers")