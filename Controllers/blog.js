const { Blog } = require ('../Models/models.js') 

 const createBlog = async (req, res) => {
  const blog = new Blog({
    ...req.body
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).send(savedBlog);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

 const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

 const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

 const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

 const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.status(200).send({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

  module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};