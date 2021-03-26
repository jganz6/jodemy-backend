const dbMySql = require("../databases/dbMySql");
const getUsers = () => {
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
  getUsers,
};
