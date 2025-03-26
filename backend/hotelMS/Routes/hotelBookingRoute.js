const express = require("express");
const multer = require('multer');
const router = express.Router();

//insert model
const HotelBooking = require("../Models/hotelBookingModel");

//insert user controller
const hotelBookingController = require("../Controllers/hotelBookingController");

//Set up Multer storage (using memoryStorage for in-memory file storage)
const storage = multer.memoryStorage(); // Files will be stored as Buffers
const upload = multer({ storage: storage });

router.get("/",hotelBookingController.getAllHotelBookings);
router.post("/",upload.single("PdfDocument"),hotelBookingController.addHotelBookings);
router.delete("/:id",hotelBookingController.deleteHotelBooking);

module.exports = router;