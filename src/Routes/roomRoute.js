const express = require("express");
const {
  createNewRoom,
  getAllRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  uploadImageRoom,
} = require("../Controllers/roomController");
const { verifyToken } = require("../utils/verifyToken");
const { upload } = require("../utils/upload");

const roomRoute = express.Router();

roomRoute.post('/', verifyToken, createNewRoom);
roomRoute.get('/', verifyToken, getAllRoom);
roomRoute.get('/:id', verifyToken, getRoomById);
roomRoute.put('/:id', verifyToken, updateRoom);
roomRoute.delete('/:id', verifyToken, deleteRoom);
roomRoute.post('/uploads-image', verifyToken, upload.single('image'), uploadImageRoom);

module.exports = roomRoute;