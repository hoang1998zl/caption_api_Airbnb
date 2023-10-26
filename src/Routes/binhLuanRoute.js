const express = require("express");
const {
  newBinhLuan,
  getAllBinhLuan,
  updateBinhLuan,
  deleteBinhLuan,
  getBinhLuanByRoom,
} = require("../Controllers/binhLuanController");
const { verifyToken } = require("../utils/verifyToken");

const binhLuanRoute = express.Router();

binhLuanRoute.post('/', verifyToken, newBinhLuan);
binhLuanRoute.get('/', verifyToken, getAllBinhLuan);
binhLuanRoute.put('/:id', verifyToken, updateBinhLuan);
binhLuanRoute.delete('/:id', verifyToken, deleteBinhLuan);
binhLuanRoute.get('/lay-binh-luan-theo-phong/:ma_phong', verifyToken, getBinhLuanByRoom);

module.exports = binhLuanRoute;