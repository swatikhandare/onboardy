const {createBlog, getBlogs, getBlog, updateBlog, deleteBlog} = require('../controllers/Blog')

const express = require('express')

const router = express.Router()

// GET all blogs
router.get('/blogs', getBlogs)

// GET one blog
router.get('/blogs/:id', getBlog)

// POST one blog
router.post('/blogs', createBlog)

// update one blog
router.put('/blogs/:id', updateBlog)

// delete one blog
router.delete('/blogs/:id', deleteBlog)



module.exports = router