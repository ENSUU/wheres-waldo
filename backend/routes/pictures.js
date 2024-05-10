const express = require('express'); 
const router = express.Router(); 

const pictureController = require("../controllers/pictureController"); 

router.get('/', pictureController.pictures_get); 
router.post('/', pictureController.pictures_post); 

router.get('/:picture_id', pictureController.picture_get); 
router.put('/:picture_id', pictureController.picture_put); 
router.delete('/:picture_id', pictureController.picture_delete); 

router.get('/:picture_id/images', pictureController.picture_images_get); 
router.post('/:picture_id/images', pictureController.picture_images_post); 

router.get('/:picture_id/images/:image_id', pictureController.picture_image_get); 
router.put('/:picture_id/images/:image_id', pictureController.picture_image_put); 
router.delete('/:picture_id/images/:image_id', pictureController.picture_image_delete); 

module.exports = router; 