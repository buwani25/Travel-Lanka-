const Hotel = require("../Models/hotelModel");

const getAllHotels = async(req,res,next) => {

    let hotels;

    //get all hotels
    try {
        hotels = await Hotel.find();
    } catch(err) {
        console.log(err);
    }

    //if not found
    if(!hotels) {
        return res.status(404).json({message:"Hotel not found"});
    }

    //display hotels
    return res.status(200).json({hotels});
}

//data insert
const addHotels = async(req,res,next) => {

    const {hotelName,location,hotelType,rooms,contactInfo,description} = req.body;

    let hotels;

    try {
        hotels = new Hotel({hotelName,location,hotelType,rooms,contactInfo,description});
        await hotels.save();
    } catch(err) {
        console.log(err);
    }

    //unable to insert hotels
    if(!hotels) {
        return res.status(404).send({message:"Unable to add hotels"});
    }
}

//get hotels by id
const getById = async(req,res,next) => {

    const id = req.params.id;

    let hotels;

    try {
        hotels = await Hotel.findById(id);
    } catch(err) {
        console.log(err);
    }

    //if hotel is not available
    if(!hotels) {
        return res.status(404).json({message:"Hotel not found"});
    }

    return res.status(200).json({hotels});
}

//update hotel details
const updateHotel = async(req,res,next) => {

    const id = req.params.id;
    const {hotelName,location,hotelType,rooms,contactInfo,description} = req.body;

    let hotels;

    try {
        hotels = await Hotel.findByIdAndUpdate(id,{hotelName: hotelName, location: location, hotelType: hotelType, rooms : rooms, contactInfo : contactInfo, description : description});
        hotels = await hotels.save();
    } catch(err) {
        console.log(err);
    }

    if(!hotels) {
        return res.status(404).json({message:"Unable to update hotel details"});
    }

    return res.status(200).json({hotels});
}

//remove hotels
const deleteHotel = async(req,res,next) => {

    const id = req.params.id;

    let hotels;

    try {
        hotels = await Hotel.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
    }

    if(!hotels) {
        return res.status(404).json({message:"Unable to delete hotel details"});
    }

    return res.status(200).json({hotels});
}

//get hotel count
const getHotelCount = async(req,res,next) => {

    try {
        const hotelCount = await Hotel.countDocuments();
        res.json({hotelCount});
    } catch(error) {
        res.status(500).json({ message: "Error fetching hotel count" });
    }
}

module.exports = {getAllHotels,addHotels,getById,updateHotel,deleteHotel,getHotelCount};
