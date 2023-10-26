const express = require("express");
const { verifyToken } = require("../utils/verifyToken");
const {
  getAllRole,
  createRole,
  deleteRole,
} = require("../Controllers/roleController");

const roleRoute = express.Router();

roleRoute.get('/', verifyToken, getAllRole);
roleRoute.post('/', verifyToken, createRole);
roleRoute.delete('/:id',verifyToken, deleteRole);

module.exports = roleRoute