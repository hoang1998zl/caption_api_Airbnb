const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const rootRoute = require('./Routes/rootRoute');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const { upload } = require('./utils/upload');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', rootRoute);

app.get('/check-connection', async (req, res) => {
  try {
    await prisma.$connect();
    res.send('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
});


app.get('/check-token', (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    let checkedToken = jwt.verify(token, 'NODE33_SERVER');

    if (checkedToken) {
      req.user = checkedToken;
      next();
      console.log(
        req.user
      )
    }
    res.send(checkedToken)
  } catch (err) {
    return res.send('err token')
  }
});

app.post('/test-upload', upload.single('image'), (req, res) => {
  const image = req.file;

  fs.readFile(image.path, (err, data) => {
    console.log(data)
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Lỗi khi đọc file hình ảnh' });
    }

    const base64Image = Buffer.from(data).toString('base64');
    const imageDataUrl = `data:${image.mimetype};base64,${base64Image}`;

    res.json({ imageDataUrl });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));