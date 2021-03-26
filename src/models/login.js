const dbMySql = require("../databases/dbMySql");
const postLogin = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT id_account,role_account FROM tb_account WHERE email_account=? AND password_account=?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        reject(new Error("errors"));
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = {
  postLogin,
};
