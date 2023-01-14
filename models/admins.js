const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 0,
        required: [true, "id must be filled!"]
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

module.exports = mongoose.model("Admins", AdminSchema);