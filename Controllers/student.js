const {Student} = require('../Models/models');

const createStudent = async (req, res) => {
    const student = new Student({
        ...req.body
    });

    try {
        const savedStudent = await student.save();
        res.status(201).send(savedStudent);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).send(students);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getStudent = async (req, res) => {
    const {id} = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send({ error: "student not found" });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!student) {
          return res.status(404).send({ error: "student not found" });
        }
        res.status(200).send(student);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send({ error: "student not found" });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
}