require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const router = require('./router');

const bodyParser = multer();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_ATLAS_URL);

app.use(cors());

app.use(bodyParser.none());

app.use(express.urlencoded({
    extended: true
  }));

app.use(router);

app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
  });