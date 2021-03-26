const dbMySql = require("../database/dbMySql");
const getUsersWithRole = () => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT * FROM tb_account`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = {
  getUsersWithRole,
};
