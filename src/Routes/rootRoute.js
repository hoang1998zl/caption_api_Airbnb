const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();

const usersRoute = require("./usersRoute");
const authRoute = require("./authRoute");
const roomRoute = require("./roomRoute");
const binhLuanRoute = require("./binhLuanRoute");
const bookingRoute = require("./bookingRoute");
const locationRoute = require("./locationRoute");
const genderRoute = require("./genderRoute");
const roleRoute = require("./roleRoute");

const rootRoute = express.Router();

rootRoute.use('/users', usersRoute);
rootRoute.use('/auth', authRoute);
rootRoute.use('/room', roomRoute);
rootRoute.use('/comments', binhLuanRoute);
rootRoute.use('/booking', bookingRoute);
rootRoute.use('/location', locationRoute)
rootRoute.use('/gender', genderRoute);
rootRoute.use('/role', roleRoute);

module.exports = rootRoute;