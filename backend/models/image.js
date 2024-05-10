const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const imageSchema = new Schema({
    center: [Number], 
    name: {
        type: String, 
        required: true,
    }, 
    radius: {
        type: Number,
        required: true,
    },
    src: {
        type: String,
        required: true, 
    },
}); 

module.exports = mongoose.model("Image", imageSchema); 