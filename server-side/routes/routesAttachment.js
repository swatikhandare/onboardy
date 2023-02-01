const {createAttachment, getAttachments, getAttachment, deleteAttachment} = require('../controllers/attachment');

const express = require('express');

const router = express.Router();

// GET all attachments
router.get('/attachments', getAttachments);

// GET one attachment

router.get('/attachments/:id', getAttachment);

// POST one attachment

router.post('/attachments', createAttachment);

// delete one attachment

router.delete('/attachments/:id', deleteAttachment);

module.exports = router;
