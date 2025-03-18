const express = require("express");
const router = express.Router();

//insert model
const Vehicle = require("../ModelTMS/vehicleModel")

//insert controller
const vehicleControl =require("../ControllersTMS/vehicleControl");

router.get("/",vehicleControl.getAllVehicles);
router.post("/",vehicleControl.addVehicles);
router.get("/:id",vehicleControl.getByID);
router.put("/:id",vehicleControl.updateVehicle);
router.delete("/:id",vehicleControl.deleteVehicle);

//export
module.exports = router;