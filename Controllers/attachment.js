const {Attachment} = require("../Models/models");

const createAttachment = async (req, res) => {
    const attachment = new Attachment({
        ...req.body
    });
    
    try {
        const savedAttachment = await attachment.save();
        res.status(201).send(savedAttachment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }

const getAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.find({});
        res.status(200).send(attachments);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getAttachment = async (req, res) => {
    const { id } = req.params;

    try {
      const attachment = await Attachment.findById(id);
      if (!attachment) {
        return res.status(404).send({ error: "attachment not found" });
      }
      res.status(200).send(attachment);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };



const deleteAttachment = async (req, res) => {
    const { id } = req.params;

  try {
    const attachment = await Attachment.findByIdAndDelete(id);
    if (!attachment) {
      return res.status(404).send({ error: "attachment not found" });
    }
    res.status(200).send({ message: "attachment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
    createAttachment,
    getAttachments,
    getAttachment,
    deleteAttachment
}

