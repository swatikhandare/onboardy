const {Staff} = require("../Models/models");

const createStaff = async (req, res) => {
    const staff = new Staff({
        ...req.body
    });
    
    try {
        const savedStaff = await staff.save();
        res.status(201).send(savedStaff);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }

const getStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({});
        res.status(200).send(staffs);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getStaff = async (req, res) => {

    const {id} = req.params;

    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).send({ error: "Staff not found" });
        }
        res.status(200).send(staff);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const updateStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!staff) {
          return res.status(404).send({ error: "staff not found" });
        }
        res.status(200).send(staff);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findByIdAndDelete(id);
        if (!staff) {
            return res.status(404).send({ error: "staff not found" });
        }
        res.status(200).send(staff);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createStaff,
    getStaffs,
    getStaff,
    updateStaff,
    deleteStaff
}
