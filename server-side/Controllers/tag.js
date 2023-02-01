const { Tag } = require("../Models/models")

const createTag = async (req, res) => {
    const tag = new Tag({
        ...req.body
    });
    
    try {
        const savedTag = await tag.save();
        res.status(201).send(savedTag);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    };

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.status(200).send(tags);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getTag = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await Tag.findById(id);
        if (!tag) {
            return res.status(404).send({ error: "Tag not found" });
        }
        res.status(200).send(tag);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const updateTag = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await Tag.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!tag) {
          return res.status(404).send({ error: "tag not found" });
        }
        res.status(200).send(tag);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await Tag.findByIdAndDelete(id);
        if (!tag) {
            return res.status(404).send({ error: "Tag not found" });
        }
        res.status(200).send(tag);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createTag,
    getTags,
    getTag,
    updateTag,
    deleteTag
}
