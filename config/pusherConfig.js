const Pusher = require("pusher");
require('dotenv').config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER, 
    host: process.env.PUSHER_HOST, 
    useTLS: false
});

module.exports = pusher;