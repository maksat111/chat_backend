const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

// -------------------------------------- app config -------------------------------------//
const PORT = process.env.PORT || 9000;
const app = express();

// ------------------------------------- Middlewares ------------------------------------ //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    return res.status(200).json({});
  }
  
  next();
})

// -------------------------------------- Pusher config ----------------------------------- //
const pusher = require('./config/pusherConfig');
const Message = require('./models/messages');

// -------------------------------------- DB config ----------------------------------- //
require('./config/dbConfig');

// ---------------------------------------- Routes -------------------------------------- //
const Routers = require('./router/routes');
app.use('/api/', Routers);

// --------------------------------------- Error handling -------------------------------//
app.use((req, res, next) => {
  return res.status(404).json({
    success: 0,
    message: "This Route doesn't exist!"
  });
});

// -------------------------------------------- listening server -----------------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));