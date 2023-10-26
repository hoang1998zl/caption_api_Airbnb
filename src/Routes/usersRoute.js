const express = require("express");
const {
  getAllUsers,
  updateUserById,
  getUserById,
  getUserByName,
  uploadAvatar,
  deleteUser,
  getUserByPage,
  getUserByToken,
  uploadAvatarByID,
} = require("../Controllers/usersController");
const { verifyToken } = require("../utils/verifyToken");
const { upload } = require("../utils/upload");

const usersRoute = express.Router();

usersRoute.get('/',verifyToken, getAllUsers);
usersRoute.get('/get-user-by-page',verifyToken, getUserByPage);
usersRoute.get('/get-user-by-token', verifyToken, getUserByToken)
usersRoute.get('/:id',verifyToken, getUserById);
usersRoute.get('/search/:ho_ten',verifyToken, getUserByName);
usersRoute.put('/:id', verifyToken, updateUserById);
usersRoute.post('/upload-avatar', upload.single('avatar'), verifyToken, uploadAvatar);
usersRoute.post('/upload-avatar/:id', upload.single('avatar'), verifyToken, uploadAvatarByID);
usersRoute.delete('/:id',verifyToken, deleteUser);

module.exports = usersRoute;