const Message = require('../models/messages');

const createMessage = async (foundCustomer, foundAdmin, message, meta) => {
    const newMessage = new Message({
        customer: foundCustomer._id,
        admin: foundAdmin._id,
        message,
        sender: {
            id: foundAdmin.id,
            type: "admin"
        },
        room_id: foundCustomer.id,
        meta,
    });

    const savedMessage = await newMessage.save();
    return savedMessage;
}

const getChats = async (page, limit) => {
    const foundChats = await Message.aggregate([
        {
            $group: {
                _id: "$room_id",
                customer: {
                    "$last": "$customer"
                },
                last_message: {
                    "$last": "$message"
                },
                last_message_deleted_at: {
                    "$last": "$deleted_at"
                },
                unread: {
                    "$sum": {
                        "$cond": [{
                            "$and": [{
                                "$eq": ["$sender.type", 'customer']
                            }, {
                                "$eq": ["$read_at", null]
                            }]
                        }, 1, 0]
                    }
                },
                room_id: {
                    "$last": "$room_id"
                },
                updated_at: {
                    "$last": "$updated_at"
                },
                created_at: {
                    "$last": "$created_at"
                },
            },
        },
        {
            $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        {
            $unwind: {
                path: "$customer"
            }
        },
        {
            $skip: limit * (page - 1),
        },
        {
            $limit: limit
        },
        {
            $sort: {
                updated_at: -1
            }
        },
    ]);

    return foundChats;
}

const search = (customer, page) => {
    const foundChats = await Message.aggregate([
        {
            $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer"
            }
        },
        {
            $unwind: {
                path: "$customer"
            }
        },
        {
            $match: {
                $or: [{
                    "customer.firstname": {
                        $regex: customer,
                        $options: "i"
                    }
                }, {
                    "customer.lastname": {
                        $regex: customer,
                        $options: "i"
                    }
                }]
            }
        },
        {
            $group: {
                _id: "$room_id",
                customer: {
                    "$last": "$customer"
                },
                last_message: {
                    "$last": "$message"
                },
                last_message_deleted_at: {
                    "$last": "$deleted_at"
                },
                unread: {
                    "$sum": {
                        "$cond": [{
                            "$and": [{
                                "$eq": ["$sender.type", 'customer']
                            }, {
                                "$eq": ["$read_at", null]
                            }]
                        }, 1, 0]
                    }
                },
                room_id: {
                    "$last": "$room_id"
                },
                updated_at: {
                    "$last": "$updated_at"
                },
                created_at: {
                    "$last": "$created_at"
                }
            },
        },
        {
            $skip: 10 * (page - 1),
        },
        {
            $limit: 10
        },
        {
            $sort: {
                updated_at: -1
            }
        }
    ]).exec();

    return foundChats;
}

const countUnread = async () => {
    const unread = await Message.count({
        'sender.type': 'customer',
        read_at: null
    });

    return unread;
}

const readMessages = async () => {
    await Message.updateMany({
        room_id,
        "sender.type": "customer"
    }, {
        $set: {
            read_at: Date.now()
        }
    });
}

const findMessages = async (room_id, startIndex, limit) => {
    const foundMessages = await Message.find({
        room_id
    }).populate("admin", "-_id -__v").select('-customer -__v').sort({
        created_at: -1
    }).skip(startIndex).limit(limit).exec();

    return foundMessages;
}

const findOneCustomer = (room_id) => {
    let foundCustomer = await Customer.findOne({
        id: room_id
    });

    return foundCustomer;
}

exports.createMessage = createMessage;
exports.getChats = getChats;
exports.search = search;
exports.countUnread = countUnread;
exports.readMessages = readMessages;
exports.findMessages = findMessages;
exports.findOneCustomer = findOneCustomer;