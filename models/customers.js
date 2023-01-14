const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 0,
        required: [true, 'id must be filled']
    },
    firstname: {
        type: String,
        default: "No name"
    },
    lastname: {
        type: String,
        default: "No surname"
    },
    updated_at: {
        type: Date,
    },
    created_at: {
        type: Date,
    }
});

CustomerSchema.index({
    "firstname": "text",
    "lastname": "text"
});

module.exports = mongoose.model("Customers", CustomerSchema);