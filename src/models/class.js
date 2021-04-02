const dbMySql = require("../databases/dbMySql");

const getAllClass = () => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM class`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve(result);
      }
    });
  });
};
const registerClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO score_subject_report (id_account,id_class,id_subject) SELECT ?,?,id_subject FROM class_subject WHERE id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const createClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO class(class_name, category, level, description, pricing, schedule, start_time, end_time) VALUES (?,?,?,?,?,?,?,?)`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve("Success");
      }
    });
  });
};
const getAllClassAndStudent = () => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE score_subject_report.id_class in(SELECT DISTINCT(id_class) FROM score_subject_report) GROUP by class.id_class`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const getMyClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    // const qs = `SELECT DISTINCT(score_subject_report.id_class), class.class_name,class.category, class.level, class.description, class.pricing, class.schedule, class.start_time, class.end_time FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ?`;
    const qs = `SELECT class.*, AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name LIKE ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class) GROUP BY class.id_class ORDER by ? ?`;
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
    const qs = `SELECT * FROM class WHERE class_name LIKE ? and id_class not IN(SELECT DISTINCT(score_subject_report.id_class)FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ? GROUP BY class.id_class)ORDER BY ? ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
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
    const qs = `INSERT INTO class_subject(id_class, subject_name, subject_date) VALUES (?,?,?)`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve(result);
      }
    });
  });
};
const getMemberClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_account), tb_account.username FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const getMemberSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT class_subject.id_class, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_account), tb_account.username FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve(result);
      }
    });
  });
};
const getMemberId = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_account), tb_account.username FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        // throw err;
        reject(err);
      } else if (result.length === 0) {
        reject("======");
      } else {
        resolve(
          result.map((o) => {
            return o.id_account;
          })
        );
      }
    });
  });
};
const updateSubReport = (qsValue, id_member) => {
  const qs = `INSERT INTO score_subject_report (id_account, id_class, id_subject) VALUES ( ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    id_member.map((o) => {
      console.log(o);
      const qsValueFull = [o.toString(), ...qsValue];
      dbMySql.query(qs, qsValueFull, (err) => {
        if (err) {
          reject("error");
        }
      });
    });
    resolve("Success");
  });
};
const deleteClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `DELETE FROM class WHERE id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const deleteSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `DELETE FROM class_subject WHERE id_subject = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const updateClass = (qsValue, id_class) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE class SET ? WHERE id_class = ?`;
    dbMySql.query(qs, [qsValue, id_class], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const updateSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE class_subject SET ? WHERE id_class=?`;
    dbMySql.query(qs, qsValue, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};
const updateScore = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE score_subject_report SET score = ? WHERE id_subject = ?`;
    dbMySql.query(qs, qsValue, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};
module.exports = {
  getAllClass,
  createClass,
  getMyClass,
  getNewClass,
  getSubjectClass,
  createSubjectClass,
  getMemberClass,
  getMemberSubjectClass,
  deleteClass,
  deleteSubjectClass,
  updateSubReport,
  getMemberId,
  getAllClassAndStudent,
  updateSubjectClass,
  updateClass,
  updateScore,
  registerClass,
};
