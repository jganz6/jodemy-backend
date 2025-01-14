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
    const qs = `INSERT INTO score_subject_report (id_account,id_class,id_subject,score) SELECT ?,?,id_subject,null FROM class_subject WHERE id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const qsFinal = `SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) as score, (count(score_subject_report.score)/count(score_subject_report.id_subject)*100) as progress, class.class_name, class.category,class.description FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class where class.id_class=? and score_subject_report.id_account = ? GROUP BY score_subject_report.id_class`;
        dbMySql.query(qsFinal, [qsValue[1], qsValue[0]], (err, data) => {
          if (err) {
            reject(err);
          } else {
            let finalResult = {
              result,
              data,
            };
            resolve(finalResult);
          }
        });
      }
    });
  });
};
const createClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO class (id_facilitator,class_name, category, level, description, pricing, schedule, start_time, end_time, class_logo) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const qsFinal = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM class LEFT OUTER JOIN score_subject_report on score_subject_report.id_class=class.id_class WHERE class.id_class = ? GROUP by class.id_class`;
        dbMySql.query(qsFinal, [result.insertId], (err, data) => {
          if (err) {
            reject(err);
          } else {
            let finalResult = {
              result,
              data,
            };
            resolve(finalResult);
          }
        });
      }
    });
  });
};
const getScheduleFacilitator = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM class INNER JOIN class_subject on class_subject.id_class=class.id_class LEFT OUTER JOIN score_subject_report on score_subject_report.id_class=class.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? and class_subject.subject_date = ? GROUP by class.id_class ORDER by ? ?`;
    // const qs = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? and score_subject_report.id_class in(SELECT DISTINCT(id_class) FROM score_subject_report) GROUP by class.id_class ORDER BY ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT COUNT(DISTINCT(class.id_class)) AS count FROM class INNER JOIN class_subject on class_subject.id_class=class.id_class LEFT OUTER JOIN score_subject_report on score_subject_report.id_class=class.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? and class_subject.subject_date = ? ORDER by ? ?";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getAllClassAndStudent = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM class LEFT OUTER JOIN score_subject_report on score_subject_report.id_class=class.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? GROUP by class.id_class ORDER by ? ?`;
    // const qs = `SELECT class.*, COUNT(DISTINCT(score_subject_report.id_account)) AS Student FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? and score_subject_report.id_class in(SELECT DISTINCT(id_class) FROM score_subject_report) GROUP by class.id_class ORDER BY ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT COUNT(DISTINCT(class.id_class)) AS count FROM class LEFT OUTER JOIN score_subject_report on score_subject_report.id_class=class.id_class WHERE class.class_name like ? ? ?and class.id_facilitator = ? ORDER by ? ?";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getAllScheduleClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    //SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = 1 GROUP BY id_class
    const qs = `SELECT * FROM class INNER JOIN class_subject on class.id_class = class_subject.id_class where class.class_name like ? ? ?and class_subject.subject_date = ? ORDER by ? ?`;
    // const qs = `SELECT class.*, AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name LIKE ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class) GROUP BY class.id_class ORDER by ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT * FROM class INNER JOIN class_subject on class.id_class = class_subject.id_class where class.class_name like ? ? ?and class_subject.subject_date = ? ORDER by ? ?";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data;
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getForYouClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    //SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = 1 GROUP BY id_class
    const qs = `SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) as score, (count(score_subject_report.score)/count(score_subject_report.id_subject)*100) as progress, class.* FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on score_subject_report.id_subject = class_subject.id_subject where class.class_name like ? ? ?and score_subject_report.id_account = ? and class_subject.subject_date = ? GROUP BY score_subject_report.id_class ORDER by ? ?`;
    // const qs = `SELECT class.*, AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name LIKE ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class) GROUP BY class.id_class ORDER by ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT count(DISTINCT(score_subject_report.id_class)) as count FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on score_subject_report.id_subject = class_subject.id_subject where class.class_name like ? ? ?and score_subject_report.id_account = ? and class_subject.subject_date = ? ORDER by ? ?";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getMyClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    //SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = 1 GROUP BY id_class
    const qs = `SELECT DISTINCT(score_subject_report.id_class),AVG(score_subject_report.score) as score, (count(score_subject_report.score)/count(score_subject_report.id_subject)*100) as progress, class.class_name, class.category,class.description,class.pricing,class.level,class.id_facilitator FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class where class.class_name like ? ? ?and score_subject_report.id_account = ? GROUP BY score_subject_report.id_class ORDER by ? ?`;
    // const qs = `SELECT class.*, AVG(score_subject_report.score) AS SCORE FROM score_subject_report INNER JOIN class on class.id_class=score_subject_report.id_class WHERE class.class_name LIKE ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class) GROUP BY class.id_class ORDER by ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT count(DISTINCT(score_subject_report.id_class)) as count FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class where class.class_name like ? ? ?and score_subject_report.id_account = ? ORDER by ? ?";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getNewClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM class WHERE class_name LIKE ? ? ?and id_class not IN(SELECT DISTINCT(score_subject_report.id_class)FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ? GROUP BY class.id_class)ORDER BY ? ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount = `SELECT count(*) as count FROM class WHERE class_name LIKE ? ? ?and id_class not IN(SELECT DISTINCT(score_subject_report.id_class)FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class WHERE score_subject_report.id_account = ?)ORDER BY ? ?`;
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getSubjectClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    //SELECT class_subject.*, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class)
    const qs = `SELECT class_subject.*, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_class = ? GROUP BY id_class)`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount = `SELECT count(class_subject.id_subject) as count  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_class = ? )`;
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getSubjectClassFacilitator = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    //SELECT class_subject.*, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report INNER JOIN class on score_subject_report.id_class = class.id_class INNER JOIN class_subject on class.id_class = class_subject.id_class where score_subject_report.id_account = ? GROUP BY id_class)
    const qs = `SELECT class_subject.* FROM class_subject INNER JOIN class on class_subject.id_class=class.id_class where class.id_facilitator = ? and class.id_class=?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount = `SELECT class_subject.* FROM class_subject INNER JOIN class on class_subject.id_class=class.id_class where class.id_facilitator = ?`;
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const createSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO class_subject(id_class, subject_name, subject_date) VALUES (?,?,?)`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};
const getMemberClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_account), tb_account.username FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT count(DISTINCT(score_subject_report.id_account)) as count FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?";
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getMemberSubjectClass = (qsValue, query) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT class_subject.*, score_subject_report.score  FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?)`;
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    dbMySql.query(
      qsWithPaginate,
      [...qsValue, limit, offset],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const qsCount =
            "SELECT count(class_subject.id_subject) as count FROM score_subject_report INNER JOIN class_subject on class_subject.id_subject=score_subject_report.id_subject WHERE id_account= ? and score_subject_report.id_class in(SELECT DISTINCT(score_subject_report.id_class) FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?)";
          // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
          dbMySql.query(qsCount, qsValue, (err, data) => {
            if (err) return reject(err);
            const { count } = data[0];
            let finalResult = {
              result,
              count,
              page,
              limit,
            };
            resolve(finalResult);
          });
        }
      }
    );
  });
};
const getMemberId = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT DISTINCT(score_subject_report.id_account), tb_account.username, tb_account.photo_profile FROM score_subject_report inner JOIN tb_account ON score_subject_report.id_account = tb_account.id_account WHERE score_subject_report.id_class = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        // throw err;
        reject(err);
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
        resolve({ result, id_class: qsValue });
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
        resolve({ result, id_class: qsValue });
      }
    });
  });
};
const updateClass = (qsValue, id) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE class SET ? WHERE id_class = ?`;
    dbMySql.query(qs, [qsValue, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        const qsFinal = `SELECT * FROM class WHERE id_class= ?`;
        dbMySql.query(qsFinal, [id], (err, data) => {
          if (err) {
            reject(err);
          } else {
            let finalResult = {
              result,
              data,
            };
            resolve(finalResult);
          }
        });
        resolve(result);
      }
    });
  });
};
const updateSubjectClass = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE class_subject SET ? WHERE id_subject=?`;
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
    const qs = `UPDATE score_subject_report SET score = ? WHERE id_account= ? and id_subject = ?`;
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
  getAllScheduleClass,
  getScheduleFacilitator,
  getForYouClass,
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
  getSubjectClassFacilitator,
};
