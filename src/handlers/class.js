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
  try {
    const result = await classModel.registerClass([
      req.user._id,
      req.query.id_class,
      req.query.id_class,
    ]);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const getAllClassAndStudent = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { search, sort, filter } = req.query;
  const qsValue = [
    ...searchValue(search, filter),
    req.user._id,
    ...sortBy(sort),
  ];
  console.log(qsValue);
  try {
    const finalResult = await classModel.getAllClassAndStudent(
      qsValue,
      req.query
    );
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const getMyClass = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { search, sort, filter } = req.query;
  const qsValue = [
    ...searchValue(search, filter),
    req.user._id,
    ...sortBy(sort),
  ];
  try {
    const finalResult = await classModel.getMyClass(qsValue, req.query);
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    console.log(error);
    response(res, "Failed", error, 400, false);
  }
};
const getNewClass = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { search, sort, filter } = req.query;
  const qsValue = [
    ...searchValue(search, filter),
    req.user._id,
    ...sortBy(sort),
  ];
  try {
    const finalResult = await classModel.getNewClass(qsValue, req.query);
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url +
          `?${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${
            filter ? `&filter=${filter}` : ""
          }&page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const getMemberClass = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { id_class } = req.params;
  try {
    const finalResult = await classModel.getMemberClass(id_class, req.query);
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1 ? null : url + `?page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url + `?&page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const getMemberSubjectClass = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { id_account, id_class } = req.params;
  try {
    const finalResult = await classModel.getMemberSubjectClass(
      [id_account, id_class],
      req.query
    );
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1 ? null : url + `?page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url + `?&page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const getSubjectClass = async (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  const { id_class } = req.params;
  try {
    const finalResult = await classModel.getSubjectClass(
      [req.user._id, id_class],
      req.query
    );
    const { result, count, page, limit } = finalResult;
    const totalPage = Math.ceil(count / limit);
    const url =
      protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
    const prev =
      page === 1 ? null : url + `?page=${page - 1}&limit=${query.limit || 3}`;
    const next =
      page === totalPage
        ? null
        : url + `?page=${page + 1}&limit=${query.limit || 3}`;
    const info = {
      count,
      page,
      totalPage,
      next,
      prev,
    };
    response(res, null, { ...[result], ...info }, 200, true);
  } catch (error) {
    response(res, "Failed", ...error, 400, false);
  }
};
const createSubjectClass = async (req, res) => {
  const { id_class, subject_name, subject_date } = req.body;
  try {
    const id_subject = await classModel.createSubjectClass([
      id_class,
      subject_name,
      subject_date,
    ]);
    const result = await classModel.getMemberId(id_class);
    const finalResult = await classModel.updateSubReport(
      [id_class, id_subject],
      result
    );
    response(res, null, [finalResult], 200, true);
  } catch (error) {
    console.log(error);
    response(res, "Failed", error, 400, false);
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
      req.user._id,
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
    response(res, "Failed", err, 400, false);
  }
};
const deleteClass = async (req, res) => {
  const { id_class } = req.params;
  try {
    const result = await classModel.deleteClass(id_class);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const deleteSubjectClass = async (req, res) => {
  const { id_subject } = req.params;
  try {
    const result = await classModel.deleteSubjectClass(id_subject);
    response(res, null, [result], 200, true);
  } catch (error) {
    response(res, "Failed", error, 400, false);
  }
};
const updateClass = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await classModel.updateClass([
      updateValue,
      req.params.id_class,
    ]);
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
      req.params.id_subject,
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
  updateSubjectClass,
  updateClass,
  updateScore,
  registerClass,
  deleteClass,
  deleteSubjectClass,
};
