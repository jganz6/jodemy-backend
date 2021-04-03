const classModel = require("../models/class");
const { searchValue } = require("./../helpers/searchValue");
const { sortBy } = require("./../helpers/sortBy");

const getAllClass = async (req, res) => {
  try {
    const result = await classModel.getAllClass();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const registerClass = async (req, res) => {
  console.log(req.query.id_class);
  try {
    const result = await classModel.registerClass([
      req.query.id_account,
      req.query.id_class,
      req.query.id_class,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAllClassAndStudent = async (req, res) => {
  try {
    const result = await classModel.getAllClassAndStudent();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getMyClass = async (req, res) => {
  const { id_account } = req.params;
  const { search, sort } = req.query;
  const qsValue = [searchValue(search), id_account, ...sortBy(sort)];
  try {
    const result = await classModel.getMyClass(qsValue);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getNewClass = async (req, res) => {
  const { id_account } = req.params;
  const { search, sort } = req.query;
  const qsValue = [searchValue(search), id_account, ...sortBy(sort)];
  try {
    const result = await classModel.getNewClass(qsValue);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getMemberClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.getMemberClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getMemberSubjectClass = async (req, res) => {
  const { id_account, id_class } = req.params;
  console.log(id_account, id_class);
  try {
    const result = await classModel.getMemberSubjectClass([
      id_account,
      id_class,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getSubjectClass = async (req, res) => {
  const { id_account } = req.params;
  try {
    const result = await classModel.getSubjectClass([id_account, id_account]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(400).send(error);
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
    res.status(400).send(err);
  }
};
const deleteClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteSubjectClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteSubjectClass(id_class);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(400).send(error);
  }
};
const updateClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await classModel.updateClass(updateValue, req.query.id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const updateSubjectClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await classModel.updateSubjectClass([
      updateValue,
      req.query.id,
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateScore = async (req, res) => {
  const { score } = req.body;
  try {
    const result = await classModel.updateScore([score, req.query.id]);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getAllClass,
  getAllClassAndStudent,
  getMyClass,
  getNewClass,
  getMemberClass,
  getSubjectClass,
  getMemberSubjectClass,
  createClass,
  createSubjectClass,
  updateSubReport,
  updateSubjectClass,
  updateClass,
  updateScore,
  registerClass,
  deleteClass,
  deleteSubjectClass,
};
