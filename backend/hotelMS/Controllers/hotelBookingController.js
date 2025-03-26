// const multer = require('multer');
const HotelBooking = require("../Models/hotelBookingModel");

// Set up Multer storage (using memoryStorage for in-memory file storage)
// const storage = multer.memoryStorage(); // Files will be stored as Buffers
// const upload = multer({ storage: storage });

const getAllHotelBookings = async(req,res,next) => {

    let hotelBookings;

    //get all hotel bookings
    try {
        hotelBookings = await HotelBooking.find();
    } catch(err) {
        console.log(err);
    }

    //if not found
    if(!hotelBookings) {
        return res.status(404).json({message:"Hotel Booking not found"});
    }

    //display hotel bookings
    return res.status(200).json({hotelBookings});
}

//data insert
const addHotelBookings = async(req,res,next) => {

    const {TripID,HotelName,CheckingDate,CheckoutDate,RoomType,NumberOfRooms,TotalCost} = req.body;

    // Get the uploaded file from Multer (in memory)
    const pdfFile = req.file;

    // Create the PdfDocument object
    const newPdfDocument = {
        filename: pdfFile.originalname,    // The original file name
        // pdfData: pdfFile.buffer,           // The file data as a Buffer
        contentType: pdfFile.mimetype     // The MIME type of the file (e.g., "application/pdf")
    };


    let hotelBookings;

    try {
        hotelBookings = new HotelBooking({TripID,HotelName,CheckingDate,CheckoutDate,RoomType,NumberOfRooms,TotalCost,PdfDocument:newPdfDocument});
        await hotelBookings.save();
    } catch(err) {
        console.log(err);
    }

    //unable to insert hotel bookings
    if(!hotelBookings) {
        return res.status(404).send({message:"Unable to add hotel bookings"});
    }
}

//delete hotel booking
const deleteHotelBooking = async(req,res,next) => {

    const id = req.params.id;

    let hotelBookings;

    try {
        hotelBookings = await HotelBooking.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
    }

    if(!hotelBookings) {
        return res.status(404).json({message:"Unable to delete hotel booking"});
    }

    return res.status(200).json({hotelBookings});
}

// module.exports = {getAllHotelBookings,addHotelBookings: upload.single('PdfDocument'),deleteHotelBooking};
module.exports = {getAllHotelBookings,addHotelBookings,deleteHotelBooking};

