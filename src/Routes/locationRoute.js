const express = require('express');
const {
  getAllLocation,
  addNewLocation,
  getLocationById,
  deleleLocation,
  uploadImageLocation,
  getLocationByPage
} = require('../Controllers/locationController');
const { verifyToken } = require('../utils/verifyToken');
const { upload } = require('../utils/upload');

const locationRoute = express.Router();

locationRoute.get('/', verifyToken, getAllLocation)
locationRoute.get('/get-location-by-page', verifyToken, getLocationByPage)
locationRoute.post('/', verifyToken, addNewLocation)
locationRoute.get('/:id',verifyToken, getLocationById)
locationRoute.delete('/:id', verifyToken, deleleLocation)
locationRoute.post('/uploads-image', verifyToken, upload.single("image"), uploadImageLocation)

module.exports = locationRoute;