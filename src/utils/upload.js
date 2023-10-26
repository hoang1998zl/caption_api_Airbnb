const multer = require("multer");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, res) {
    res(null, 'uploads');
  },
  filename: function (req, file, res) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    res(null, uniqueSuffix + "-" + file.fieldname + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
