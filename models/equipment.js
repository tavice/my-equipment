const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    year: {
        type: Number,
        min: 1900, // minimum value
        max: new Date().getFullYear() // maximum value
    },
    description: { type: String, require: true },
    model: { type: String, require: true },
    purchase: String,
    isDriveable: { type: Boolean, require: true },
    location: String,
    lat: Number,
    long: Number,

    currentUser: { type: String, require: true },
    typeEquipment: { type: String, require: true },
    price: {
        type: Number,
        min: 0,
      
      }
})


const Equipment = mongoose.model('Equipment', equipmentSchema)
module.exports = Equipment;


// The buffers module provides a way of handling streams of binary data: data field of type Buffer to store the binary image data, and a contentType field of type String to store the MIME type of the image.

