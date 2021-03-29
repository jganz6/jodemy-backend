const classModel = require("../models/class");

const getAllClass = async (req, res) => {
  try {
    const result = await classModel.getAllCLass();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getMyClass = async (req, res) => {
  const { id_account } = req.params;
  try {
    const result = await classModel.getMyClass(id_account);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getNewClass = async (req, res) => {
  const { id_account } = req.params;
  try {
    const result = await classModel.getNewClass(id_account);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getMemberClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.getMemberClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getMemberSubjectClass = async (req, res) => {
  const { id_account, id_class } = req.params;
  try {
    const result = await classModel.getMemberSubjectClass([
      id_account,
      id_class,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getSubjectClass = async (req, res) => {
  const { id_account } = req.params;
  try {
    const result = await classModel.getSubjectClass([id_account, id_account]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const createSubjectClass = async (req, res) => {
  const { id_class, subject_name, subject_date } = req.body;
  try {
    const result = await classModel.getSubjectClass([
      id_class,
      subject_name,
      subject_date,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const createClass = async (req, res) => {
  const {
    class_name,
    category,
    level,
    description,
    pricing,
    schedule,
    start_time,
    end_time,
  } = req.body;
  try {
    const result = await classModel.createrClass([
      class_name,
      category,
      level,
      description,
      pricing,
      schedule,
      start_time,
      end_time,
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("err");
  }
};
const deleteClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const deleteSubjectClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteSubjectClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
module.exports = {
  getAllClass,
  createClass,
  getMyClass,
  getNewClass,
  getMemberClass,
  getSubjectClass,
  createSubjectClass,
  getMemberSubjectClass,
  deleteClass,
  deleteSubjectClass,
};
