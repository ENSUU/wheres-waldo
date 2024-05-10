const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const pictureSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    }, 
    src: {
        type: String, 
        required: true, 
    }, 
    scores: {
        type: Map,
    }, 
    dimensions: {
        type: Map, 
    }, 
    images: {
        type: [{type: Schema.Types.ObjectId, ref: "Image"}], 
        required: true, 
    },
    attribution_text: {
        type: String,
    }, 
    attribution_link: {
        type: String,
    } 
}); 

module.exports = mongoose.model("Picture", pictureSchema); 