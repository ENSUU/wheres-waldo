const Picture = require("../models/picture"); 
const Image = require("../models/image"); 

const asyncHandler = require("express-async-handler"); 
const { body, validationResult } = require("express-validator"); 

exports.pictures_get = asyncHandler(async (req, res, next) => {
    const pictures = await Picture.find().exec();   
    res.status(200).json({ pictures }); 
})

exports.pictures_post = (req, res, next) => {
    res.send("Not implemented yet. POST request to create new picture."); 
}

exports.picture_get = asyncHandler(async (req, res, next) => {
    const picture = await Picture.findById(req.params.picture_id).populate("images").exec(); 
    
    if (!picture) {
        res.status(400).json({ message: `Picture with id: ${req.params.picture_id} does not exist`}); 
    }

    res.status(200).json({picture}); 
})

exports.picture_put = asyncHandler(async (req, res, next) => {
    const picture = await Picture.findById(req.params.picture_id).exec();
    const originalBody = req.body; 

    body('user', "Your name should not be empty").trim().escape().notEmpty(); 
    
    const error = validationResult(req); 

    if (!error.isEmpty) {
        return res.status(400).json({ message: error.message }); 
    }
   
    // Check if entry with name already exists. 
    if (picture.scores.has(req.body.user)) return res.status(400).json({ message: "User already exists. Try another name. "}); 
    picture.scores.set(originalBody.user, originalBody.time); 
    picture.markModified("scores"); // Need to do this when updating Maps in Mongoose.  
    await picture.save(); 

    console.log(picture); 

    return res.status(200).json({ picture, message: "Added to the scoreboard" }); 
}) 
 
exports.picture_delete = (req, res, next) => {
    res.send(`Not implemented yet. DELETE request to delete picture ${req.params.picture_id}`); 
}

exports.picture_images_get = (req, res, next) => {
    res.send(`Not implemented yet. GET request for all the images for picture ${req.params.picture_id}`); 
}

exports.picture_images_post = (req, res, next) => {
    res.send(`Not implemented yet. POST request to create new image for picture ${req.params.picture_id}`); 
}

exports.picture_image_get = (req, res, next) => {
    res.send(`Not implemented yet. GET request for image ${req.params.image_id} of picture ${req.params.picture_id}`); 
}

exports.picture_image_put = (req, res, next) => {
    res.send(`Not implemented yet. PUT request to update image ${req.params.image_id} of picture ${req.params.picture_id}`); 
}

exports.picture_image_delete = (req, res, next) => {
    res.send(`Not implemented yet. DELETE request to delete image ${req.params.image_id} of picture ${req.params.picture_id}`); 
}