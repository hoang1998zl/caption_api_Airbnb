const express = require("express");
const { verifyToken } = require("../utils/verifyToken");
const {
  getAllGender,
  createGender,
  deleteGender,
} = require("../Controllers/genderController");

const genderRoute = express.Router();

genderRoute.get('/', verifyToken, getAllGender);
genderRoute.post('/', verifyToken, createGender);
genderRoute.delete('/:id',verifyToken, deleteGender);

module.exports = genderRoute