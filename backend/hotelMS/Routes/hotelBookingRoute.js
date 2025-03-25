const express = require("express");
const router = express.Router();

//insert model
const HotelBooking = require("../Models/hotelBookingModel");

//insert user controller
const hotelBookingController = require("../Controllers/hotelBookingController");

router.get("/",hotelBookingController.getAllHotelBookings);
router.post("/",hotelBookingController.addHotelBookings);
router.delete("/:id",hotelBookingController.deleteHotelBooking);

module.exports = router;