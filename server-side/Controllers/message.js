const{ Message } = require('../Models/models.js');

const createMessage = async (req, res) => {
    const message = new Message({
        ...req.body
    });
    
    try {
        const savedMessage = await message.save();
        res.status(201).send(savedMessage);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getMessage = async (req, res) => {
    const {id} = req.params;

    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).send({ error: "message not found" });
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const updateMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!message) {
          return res.status(404).send({ error: "message not found" });
        }
        res.status(200).send(message);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteMessage = async (req, res) => {
    const {id} = req.params;

    try {
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).send({error: "message not found"});
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage
}
