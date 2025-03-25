const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelBookingSchema = new Schema ({
    TripID: {
        type: Number,
        required: true,
    },
    HotelName: {
        type: String,
        required: true,
    },
    CheckingDate: {
        type: Date,
        required: true,
    },
    CheckoutDate: {
        type: Date,
        required: true,
    },
    RoomType: {
        type: String,
        required: true,
    },
    NumberOfRooms: {
        type: Number,
        required: true,
    },
    TotalCost: {
        type: Number,
        required: true,
    },
    PdfDocument: {  
        filename: { type: String, required: true },  // File name
        pdfData: { type: Buffer, required: true },  // Store file as binary
        contentType: { type: String, required: true }  // Example: "application/pdf"
    }
})

module.exports = mongoose.model("HotelBookingModel",hotelBookingSchema);