const classModel = require("../models/class");
const { searchValue } = require("./../helpers/searchValue");
const { sortBy } = require("./../helpers/sortBy");
const response = require("./../helpers/response");

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
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
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
  const { search, sort } = req.query;
  const qsValue = [searchValue(search), req.user._id, ...sortBy(sort)];
  try {
    const result = await classModel.getMyClass(qsValue);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const getNewClass = async (req, res) => {
  const { search, sort } = req.query;
  const qsValue = [searchValue(search), req.user._id, ...sortBy(sort)];
  try {
    const result = await classModel.getNewClass(qsValue);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
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
  const { id_class } = req.params;
  try {
    const result = await classModel.getSubjectClass([req.user._id, id_class]);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const createSubjectClass = async (req, res) => {
  const { id_class, subject_name, subject_date } = req.body;
  try {
    const result = await classModel.createSubjectClass([
      id_class,
      subject_name,
      subject_date,
    ]);
    response(res, null, [result], 200, true);
  } catch (error) {
    console.log(error);
    response(res, "Failed", ...error, 400, false);
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
    const result = await classModel.createClass([
      class_name,
      category,
      level,
      description,
      pricing,
      schedule,
      start_time,
      end_time,
    ]);
    response(res, null, [result], 200, true);
  } catch (err) {
    console.log(err);
    response(res, "Failed", ...err, 400, false);
  }
};
const deleteClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteClass(id_class);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const deleteSubjectClass = async (req, res) => {
  const { id_subject } = req.params;
  try {
    const result = await classModel.deleteSubjectClass(id_subject);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
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
    response(res, null, [resultFINAL], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const updateClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await classModel.updateClass(updateValue, req.query.id);
    response(res, null, [result], 200, true);
  } catch (error) {
    console.log(error);
    response(res, "Failed", ...error, 400, false);
  }
};
const updateSubjectClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await classModel.updateSubjectClass([
      updateValue,
      req.query.id,
    ]);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const updateScore = async (req, res) => {
  const { score, id_subject } = req.body;
  try {
    const result = await classModel.updateScore([
      score,
      req.query.id,
      id_subject,
    ]);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
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
