const dbMySql = require("../databases/dbMySql");
const postValidation = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT id_account,role,password FROM tb_account WHERE email=?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("Wrong EMAIL!");
      } else {
        resolve(
          (result = {
            id: `${result[0].id_account}`,
            password: `${result[0].password}`,
          })
        );
      }
    });
  });
};
const postResetPassword = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE tb_account SET password = ? WHERE id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
};
const postRegister = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO tb_account (email, password, username) VALUES(? , ? , ?)`;
    dbMySql.query(qs, qsValue, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};
const updateAccount = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE tb_account SET ? WHERE id_account=?`;
    dbMySql.query(qs, qsValue, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};
const deleteAccount = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `DELETE FROM tb_account WHERE id_account= ? `;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = {
  postResetPassword,
  postValidation,
  postRegister,
  updateAccount,
  deleteAccount,
};
