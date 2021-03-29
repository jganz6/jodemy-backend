const classModel = require("../models/class");

const getAllClass = async (req, res) => {
  try {
    const result = await classModel.getAllClass();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const getAllClassAndStudent = async (req, res) => {
  try {
    const result = await classModel.getAllClassAndStudent();
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
const updateSubReport = async (req, res) => {
  const { id_class, id_subject } = req.params;
  try {
    const result = await classModel.getMemberId(id_class);
    const resultFINAL = await classModel.updateSubReport(
      [id_class, id_subject],
      result
    );
    res.status(200).send(resultFINAL);
  } catch (error) {
    res.status(400).send("err");
  }
};
const updateClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await authModel.updateClass([updateValue, ...req.query.id]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const updateSubjectClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await authModel.updateSubjectClass([
      updateValue,
      ...req.query.id,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
const updateScore = async (req, res) => {
  const { score } = req.body;
  try {
    const result = await authModel.updateScore([score, req.query.id]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("err");
  }
};
module.exports = {
  getAllClass,
  getAllClassAndStudent,
  createClass,
  getMyClass,
  getNewClass,
  getMemberClass,
  getSubjectClass,
  createSubjectClass,
  getMemberSubjectClass,
  deleteClass,
  deleteSubjectClass,
  updateSubReport,
  updateSubjectClass,
  updateClass,
  updateScore,
};
