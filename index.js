'use strict';
const express = require('express');
const app = express();
const MessageApi = require('./routes/MessageApi');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
app.use('/', MessageApi);

mongoose.connect(
    process.env.DB_URL,
    {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log(`Connected to ${process.env.DB_NAME} database`)
);

app.listen(process.env.HOST_PORT,function(){
  console.log(`${process.env.APP_URL}:${process.env.HOST_PORT}`);
});