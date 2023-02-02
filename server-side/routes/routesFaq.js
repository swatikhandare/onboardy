const {createFAQ, getFAQs, getFAQ, updateFAQ, deleteFAQ} = require('../Controllers/faq');

const express = require('express');

const router = express.Router();

// GET all faqs
router.get('/faqs', getFAQs);

// GET one faq
router.get('/faqs/:id', getFAQ);

// POST one faq
router.post('/faqs', createFAQ);

// update one faq
router.put('/faqs/:id', updateFAQ);

// delete one faq
router.delete('/faqs/:id', deleteFAQ);

module.exports = router;

