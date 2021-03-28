const dbMySql = require("../databases/dbMySql");

const getAllCLass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM tb_class`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve((result = result[0]));
      }
    });
  });
};
const createClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO tb_class (column1, column2) VALUES (column1, column2)`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve((result = result[0]));
      }
    });
  });
};
const getMyClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_class), class.* FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve((result = result[0]));
      }
    });
  });
};
const getNewClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_class), class.* FROM score_subject_report INNER JOIN class on score_subject_report.id_class <> class.id_class WHERE score_subject_report.id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve((result = result[0]));
      }
    });
  });
};
const getSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_class), class.* ,class_subject.subject_date FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve((result = result[0]));
      }
    });
  });
};
module.exports = {
  getAllCLass,
  createClass,
  getMyClass,
  getNewClass,
  getSubjectClass,
};
