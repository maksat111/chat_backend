const pusher = require('../config/pusherConfig');
const Message = require('../models/messages');
const Customer = require('../models/customers');
const fetch = require('node-fetch-commonjs');
const customerRepository = require('../repositories/customerRepository');
const messageRepository = require('../repositories/messageRepository');
const adminRepository = require('../repositories/adminRepesitory');

const sendMessage = async (req, res) => {
    const { customer_id, message, meta } = req.body;
    const { foundAdmin } = req;
    try {
        let foundCustomer = await customerRepository.findCustomer(customer_id);
        let savedMessage = await adminRepository.createMessage(foundCustomer, foundAdmin, message, meta);

        const data = {
            _id: savedMessage._id,
            admin: {
                id: foundAdmin.id,
                firstname: foundAdmin.firstname,
                lastname: foundAdmin.lastname,
            },
            sender: {
                id: foundAdmin.id,
                type: "admin"
            },
            message: savedMessage.message,
            room_id: savedMessage.room_id,
            read_at: savedMessage.read_at,
            meta: savedMessage.meta,
            deleted_at: savedMessage.deleted_at,
            updated_at: savedMessage.updated_at,
            created_at: savedMessage.created_at,
        }

        pusher.trigger(`private-Customers.Chat.${customer_id}`, 'Customer.Notification.Created', data);

        res.status(201).json({
            success: 1,
            message: "Message sent!",
            data
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const getChats = async (req, res) => {
    try {
        let { limit, page } = req.query;

        if (!limit || limit > 100) {
            limit = 10
        }

        page = parseInt(page);
        limit = parseInt(limit);

        const foundChats = await adminRepository.getChats(page, limit);

        res.status(200).json({
            success: 1,
            data: foundChats
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const getExactMessage = async (req, res) => {
    try {
        const { room_id } = req.params;
        let { page, limit } = req.query;

        if (!limit || limit > 100) {
            limit = 10
        }

        if (!page) {
            page = 1
        }

        const startIndex = limit * (page - 1);

        await adminRepository.readMessages(room_id);

        const foundMessages = await adminRepository.findMessages(room_id, startIndex, limit);

        foundMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        res.status(200).json({
            success: 1,
            data: foundMessages
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const findChat = async (req, res) => {
    const { customer } = req.query;
    const { page } = req.query;
    try {
        const data = await adminRepository.search(customer, page);

        res.status(200).json({
            success: 1,
            data
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        fetchOptions = {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }

        fetch(`${process.env.API_URL}/admin/auth/login`, fetchOptions).then(async data => {
            const jsonData = await data.json();

            if (!data.ok) {
                return res.status(data.status).json({
                    success: 0,
                    data: jsonData
                });
            }

            res.status(data.status).json({
                success: 1,
                data: jsonData
            });
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            data: err.message
        })
    }
}

const unreadMessages = async (req, res) => {
    const { room_id } = req.query;
    try {
        if (!room_id) {
            const unread = await adminRepository.countUnread();

            return res.status(200).json({
                success: 1,
                data: {
                    unread_messages: unread
                }
            });
        }

        let foundCustomer = await adminRepository.findOneCustomer(room_id);

        if (!foundCustomer) {
            return res.status(200).json({
                success: 0,
                message: `No Customer with id=${room_id}`
            });
        }

        const unread = await Message.count({
            "sender.type": "customer",
            room_id,
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
            'sender.type': "admin"
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
            message: "Message deleted!"
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

exports.login = login;
exports.sendMessage = sendMessage;
exports.getChats = getChats;
exports.getExactMessage = getExactMessage;
exports.findChat = findChat;
exports.unreadMessages = unreadMessages;
exports.deleteMessage = deleteMessage;