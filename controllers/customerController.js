const pusher = require("../config/pusherConfig");
const Message = require("../models/messages");

const sendMessage = async (req, res) => {
    try {
        const { message, meta } = req.body;
        const { foundCustomer } = req;

        const newMessage = new Message({
            customer: foundCustomer._id,
            message,
            room_id: foundCustomer.id,
            sender: {
                id: foundCustomer.id,
                type: "customer"
            },
            meta,
        });
        const savedMessage = await newMessage.save();

        data = {
            _id: savedMessage._id,
            sender: savedMessage.sender,
            customer: {
                id: foundCustomer.id,
                firstname: foundCustomer.firstname,
                lastname: foundCustomer.lastname
            },
            message: savedMessage.message,
            room_id: savedMessage.room_id,
            read_at: savedMessage.read_at,
            updated_at: savedMessage.updated_at,
            created_at: savedMessage.created_at,
            deleted_at: savedMessage.deleted_at
        }

        pusher.trigger(`private-Staff.Chat.Customers`, 'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', data);

        res.status(201).json({
            success: 1,
            data
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const getMessages = async (req, res) => {
    try {
        let { id, limit } = req.query; //id => message _id

        if (!limit || limit > 100) {
            limit = 10;
        }

        const { foundCustomer } = req;
        let foundMessages = [];

        const updated = await Message.updateMany({
            "sender.type": "admin",
            room_id: foundCustomer.id
        }, {
            $set: {
                read_at: Date.now()
            }
        });

        if (!id) {
            foundMessages = await Message.find({
                    room_id: foundCustomer.id
                }).populate("admin", "-_id -__v").select("-customer -__v")
                .sort({
                    created_at: -1
                }).limit(limit).exec();

            foundMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            return res.status(200).json({
                success: 1,
                data: foundMessages
            });
        }

        const message = await Message.findById(id);
        const createdAt = new Date(message.created_at);

        foundMessages = await Message.find({
                created_at: {
                    $lt: createdAt
                },
                room_id: foundCustomer.id
            }).populate('admin', "-_id -__v")
            .select("-customer -__v").sort({
                created_at: -1
            }).limit(limit).exec();

        foundMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        res.status(200).json({
            success: 1,
            data: foundMessages
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const unreadMessages = async (req, res) => {
    try {
        const { foundCustomer } = req;

        const unread = await Message.count({
            "sender.type": "admin",
            room_id: foundCustomer.id,
            read_at: null
        });

        res.status(200).json({
            success: 1,
            data: {
                unread_messages: unread
            }
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { message_id } = req.params;

        const deleted_message = await Message.updateOne({
            _id: message_id,
            'sender.type': "customer"
        }, {
            $set: {
                deleted_at: Date.now()
            }
        });

        if (deleted_message.modifiedCount == 0) {
            return res.status(200).json({
                success: 0,
                message: "Message not deleted!"
            });
        }
        
        res.status(200).json({
            success: 1,
            message: "Message deleted successfully!"
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
exports.unreadMessages = unreadMessages;
exports.deleteMessage = deleteMessage;