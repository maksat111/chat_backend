const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const adminController = require('../controllers/adminController');
const customerController = require('../controllers/customerController');

//------------------------------------------- Middlewares --------------------------------------------------//
const adminAuthCheck = require('../middlewares/adminAuthCheck');
const customerAuthCheck = require('../middlewares/customerAuthCheck');

// ------------------------------------------- Admin Routes ---------------------------------------- //
router.post("/admin/login", adminController.login);
router.post("/admin/sendMessage", adminAuthCheck, adminController.sendMessage);
router.get('/admin/getChats', adminAuthCheck, adminController.getChats);
router.get("/admin/findChat", adminAuthCheck, adminController.findChat);
router.get("/admin/messages/unread", adminAuthCheck, adminController.unreadMessages);
router.delete("/admin/messages/delete/:message_id", adminAuthCheck, adminController.deleteMessage);
router.get("/admin/:room_id", adminAuthCheck, adminController.getExactMessage);

// ------------------------------------------ Customer Routes ------------------------------------ //
router.post("/chat/message/send", customerAuthCheck, customerController.sendMessage);
router.get("/chat/message/list", customerAuthCheck, customerController.getMessages);
router.get("/chat/message/unread", customerAuthCheck, customerController.unreadMessages);
router.delete("/chat/message/delete/:message_id", customerAuthCheck, customerController.deleteMessage);

module.exports = router;