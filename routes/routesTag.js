const {createTag, getTags, getTag, updateTag, deleteTag} = require('../controllers/tag');

const express = require('express');

const router = express.Router();

// GET all tags
router.get('/tags', getTags);

// GET one tag
router.get('/tags/:id', getTag);

// POST one tag
router.post('/tags', createTag);

// update one tag
router.put('/tags/:id', updateTag);

// delete one tag
router.delete('/tags/:id', deleteTag);

module.exports = router;