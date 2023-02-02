const {createMessage, getMessages, getMessage, updateMessage, deleteMessage} = require('../Controllers/message');

const express = require('express');

const router = express.Router();

// GET all messages
router.get('/messages', getMessages);

// GET one message
router.get('/messages/:id', getMessage);

// POST one message
router.post('/messages', createMessage);

// update one message
router.put('/messages/:id', updateMessage);

// delete one message
router.delete('/messages/:id', deleteMessage);

module.exports = router;

