const Driver=require("../ModelTMS/driverModel");

const getAllDrivers=async(req,res,next)=>{
    let drivers;

    try{
        drivers=await Driver.find();
    }catch(err){
        console.log(err);
    }

    if(!drivers){
        return res.status(404).json({message:"Driver not found"});
    }

    return res.status(200).json({drivers});
};

const addDrivers=async(req,res,next)=>{
    const{driverCompanyID,FirstName,LastName,Age,ContactNumber,Address,LicenceNumber,license_expiry_date,license_category}=req.body;

    let drivers;

    try{
        drivers=new Driver({driverCompanyID,FirstName,LastName,Age,ContactNumber,Address,LicenceNumber,license_expiry_date,license_category})
        await drivers.save();
    }catch(err){
        console.log(err);
    }

    if(!drivers){
        return res.status(404).send({message:"unable to add drivers"});
    }
    return res.status(200).json({drivers});
};

const getById=async(req,res,next)=>{
    const id=req.params.id;

    let driver;

    try{
        driver = await Driver.findById(id)
    }catch(err){
        console.log(err);
    }

    if(!driver){
        return res.status(404).send({message:"driver not found"});
    }
    return res.status(200).json({driver});
}

const updateDriver=async(req,res,next)=>{
    const id=req.params.id;
    const{driverCompanyID,FirstName,LastName,Age,ContactNumber,Address,LicenceNumber,license_expiry_date,license_category}=req.body;

    let drivers;

    try{
        drivers=await Driver.findByIdAndUpdate(id,
            {driverCompanyID:driverCompanyID,FirstName:FirstName,LastName:LastName,Age:Age,ContactNumber:ContactNumber,Address:Address,LicenceNumber:LicenceNumber,license_expiry_date:license_expiry_date,license_category:license_category});
            drivers=await drivers.save();
    }catch(err){
        console.log(err)
    }
    if(!drivers){
        return res.status(404).json({message:"unable to update driver"});
    }

    return res.status(200).json({drivers});

};

const deleteDriver=async(req,res,next)=>{
    const id=req.params.id;

    let driver;

    try{
        driver=await Driver.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!driver){
        return res.status(404).json({message:"unable to delete driver"});
    }

    return res.status(200).json({driver});
}
exports.getAllDrivers=getAllDrivers;
exports.addDrivers=addDrivers;
exports.getById=getById;
exports.updateDriver=updateDriver;
exports.deleteDriver=deleteDriver;