const express = require("express");
const router = express.Router();

//insert model
const Hotel = require("../Models/hotelModel");

//insert user controller
const hotelController = require("../Controllers/hotelController");

router.get("/",hotelController.getAllHotels);
router.get("/hotel-count",hotelController.getHotelCount);
router.post("/",hotelController.addHotels);
router.get("/:id",hotelController.getById);
router.put("/:id",hotelController.updateHotel);
router.delete("/:id",hotelController.deleteHotel);

//export
module.exports = router;
