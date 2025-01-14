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
            role: `${result[0].role}`,
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
const verifyOTP = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT id_account, role FROM tb_account WHERE otp=? and id_account=?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject("Unauthorized OTP");
      } else {
        resolve(
          (result = {
            id: `${result[0].id_account}`,
            role: `${result[0].role}`,
          })
        );
      }
    });
  });
};
const updateOTP = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE tb_account SET otp = ? WHERE id_account = ?`;
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
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const postLogout = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `INSERT INTO user_logs (token) VALUES(?)`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const isLogout = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT token FROM user_logs WHERE token=?`;
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
  postLogout,
  isLogout,
  updateOTP,
  verifyOTP,
};
