const mongoose = require('mongoose');
require('dotenv').config()

const connection_url = process.env.CONNECTION_URL || 'mongodb://127.0.0.1:27017/asman-Chat';

const mongoOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(connection_url, mongoOption)
    .then(() => console.log('Connected to mongo server.'))
    .catch((err) => console.log("Error on connecting Mongo Server: ", err));