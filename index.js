require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  (error) => {
    if (error) {
      console.log('Error : ', error);
    } else {
      console.log('Mindset db connected');
    }
  },
);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`App MindSet listening at http://localhost:${process.env.PORT}`);
});
