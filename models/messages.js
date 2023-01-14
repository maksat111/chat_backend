const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins',
        default: null
    },
    sender: {
        id: {
            type: Number,
        },
        type: {
            type: String,
            enum: {
                values: ["customer", "admin"],
                message: "{VALUE} is not supported! Please enter the values 'customer' or 'admin'."
            },
            required: [true, 'sender_type field is required!']
        }
    },
    message: {
        type: String,
        default: ' '
    },
    room_id: {
        type: Number,
    },
    meta: {
        type: Object,
        default: {}
    },
    read_at: {
        type: Date,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Messages", MessageSchema);