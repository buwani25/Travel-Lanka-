const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema ({
    hotelName:{
        type:String, //dataType
        required:true, //validate
        minlength: 3,
        maxlength: 100,
    },
    location:{
        type:String,
        required:true,
        minlength: 3,
    },
    hotelType:{
        type:String,
        required:true,
        enum: ["Resorts", "Villa", "Hotel", "Motel", "Guest House"],
    },
    rooms:[
        {
            roomType:{
                type:String,
                required:true,
                enum:["Single","Double","Deluxe","Suite"]
            },
            pricePerNight:{
                type:Number,
                required:true,
                min:1
            },
            numberOfRooms:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    contactInfo:{
        email:{
            type:String,
            required:true,
            match:[/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        phone:{
            type:Number,
            required:true,
            match: [/^\d{10,15}$/, "Please enter a valid phone number"]
        }
    },
    description:{
        type:String,
        required:true,
        minlength: 10,
        maxlength: 500,
    }
});

module.exports = mongoose.model("HotelModel",hotelSchema); //filename,functionname