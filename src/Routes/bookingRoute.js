const express = require("express");
const {
  getAllBooking,
  newBooking,
  getBookingById,
  updateBookingData,
  deleteBooking,
  getBookingByUserId
} = require("../Controllers/bookingController");
const { verifyToken } = require("../utils/verifyToken");

const bookingRoute = express.Router();

bookingRoute.post('/', verifyToken, newBooking);
bookingRoute.get('/', verifyToken, getAllBooking);
bookingRoute.get('/:id', verifyToken, getBookingById);
bookingRoute.put('/:id', verifyToken, updateBookingData);
bookingRoute.delete('/:id', verifyToken, deleteBooking);
bookingRoute.get('/lay-theo-nguoi-dung/:ma_nguoi_dat', verifyToken, getBookingByUserId);

module.exports = bookingRoute