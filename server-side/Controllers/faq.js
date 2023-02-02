const {FAQ} = require('../Models/models');

const createFAQ = async (req, res) => {
    const faq = new FAQ({
        ...req.body
    });
    
    try {
        const savedFAQ = await faq.save();
        res.status(201).send(savedFAQ);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
    };

const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({});
        res.status(200).send(faqs);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

const getFAQ = async (req, res) => {
    const {id} = req.params;

    try {
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).send({error: "FAQ not found"});
        }
        res.status(200).send(faq);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

const updateFAQ = async (req, res) => {
    const { id } = req.params;

  try {
    const faq = await FAQ.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!faq) {
      return res.status(404).send({ error: "faq not found" });
    }
    res.status(200).send(faq);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteFAQ = async (req, res) => {
    const {id} = req.params;

    try {
        const faq = await FAQ.findByIdAndDelete(id);
        if (!faq) {
            return res.status(404).send({error: "FAQ not found"});
        }
        res.status(200).send(faq);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports = {
    createFAQ,
    getFAQs,
    getFAQ,
    updateFAQ,
    deleteFAQ
}
