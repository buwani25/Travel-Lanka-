const Vehicle = require("../ModelTMS/vehicleModel");

const getAllVehicles = async(req,res,next) =>{

    let vehicles;

    try{
        vehicles=await Vehicle.find();
    }catch(err){
        console.log(err);
    }
    //not found
    if(!vehicles){
        return res.status(404).json({message:"Vehicle not found"});
    }

    //Display
    return res.status(200).json({vehicles});
};

//data insert
const addVehicles = async(req,res,next)=>{
    const{VehicleID,VehicleType,Model,VehicleNumber,Capacity,FuelType,VehicleStatus}=req.body;

    let vehicles;

    try{
        vehicles = new Vehicle({VehicleID,VehicleType,Model,VehicleNumber,Capacity,FuelType,VehicleStatus});
        await vehicles.save();
    }catch(err){
        console.log(err);
    }

    //not insert vehicles
    if(!vehicles){
        return res.status(404).send({message:"unable to add vehicle"});
    }
    return res.status(200).json({vehicles});

};

//Get by ID
const getByID = async (req,res,next)=>{
    const id=req.params.id;

    let vehicle;
    try{
        vehicle = await Vehicle.findById(id);
    }catch(err){
        console.log(err);
    }
    
    //not available vehicles
    if(!vehicle){
        return res.status(404).send({message:"vehicle not found"});
    }
    return res.status(200).json({vehicle});
}

//update user details
const updateVehicle = async(req,res,next)=> {

    const id = req.params.id;
    const{VehicleID,VehicleType,Model,VehicleNumber,Capacity,FuelType,VehicleStatus}=req.body;

    let vehicles;

    try{
        vehicles = await Vehicle.findByIdAndUpdate(id,
            {VehicleID: VehicleID,VehicleType:VehicleType,Model:Model,VehicleNumber:VehicleNumber,Capacity:Capacity,FuelType:FuelType,VehicleStatus:VehicleStatus});
            vehicles = await vehicles.save();
    }catch(err){
        console.log(err);
    }
    if(!vehicles){
        return res.status(404).send({message:"unable to update vehicle details"});
    }
    return res.status(200).json({vehicles});
};

//delete user details
const deleteVehicle = async(req,res,next)=>{
    const id=req.params.id;

    let vehicle;

    try{
        vehicle = await Vehicle.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!vehicle){
        return res.status(404).send({message:"unable to delete vehicle"});
    }
    return res.status(200).json({vehicle});
};
exports.getAllVehicles =getAllVehicles;
exports.addVehicles = addVehicles;
exports.getByID = getByID;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;