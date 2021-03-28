const classModel = require("./../models/class");

const getAllClass = async (req, res) => {
  try {
    const result = await classModel.getAllCLass();
  } catch (error) {
    res.status(400).send("err");
  }
};
const createClass = async (req, res) => {
  try {
    const result = await classModel.createrClass();
  } catch (err) {
    res.status(400).send("err");
  }
};
module.exports = {
  getAllClass,
  createClass,
};
