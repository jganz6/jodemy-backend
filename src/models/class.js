const dbMySql = require("../databases/dbMySql");

const getAllCLass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM class`;
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
    const qs = `INSERT INTO class(id_class, class_name, category, level, description, pricing, schedule, start_time, end_time) VALUES (null,?,?,?,?,?,?,?,?)`;
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
const getMyClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_class), class.class_name,class.category, class.level, class.description, class.pricing, class.schedule, class.start_time, class.end_time FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const getNewClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM class WHERE id_class not IN(SELECT DISTINCT(score_subject_report.id_class)FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ? GROUP BY class.id_class)`;
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
    const qs = `SELECT class_subject.*, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class)`;
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
const createSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO class_subject(id_subject, id_class, subject_name, subject_date) VALUES (null,?,?,?)`;
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
const updateSubReport = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO class_subject(id_subject, id_class, subject_name, subject_date)`;
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
  createSubjectClass,
};
