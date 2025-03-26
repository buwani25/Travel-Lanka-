const express=require("express");
const router=express.Router();

const Driver=require("../ModelTMS/driverModel");

const driverController=require("../ControllersTMS/driverControl");

router.get("/",driverController.getAllDrivers);
router.post("/",driverController.addDrivers);
router.get("/:id",driverController.getById);
router.put("/:id",driverController.updateDriver);
router.delete("/:id",driverController.deleteDriver);


module.exports=router;