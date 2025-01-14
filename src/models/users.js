const dbMySql = require("../databases/dbMySql");
const getUsersInfo = (qsValue) => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT id_account,username,phone_number,role,photo_profile FROM tb_account WHERE id_account = ?`;
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const updateAccount = (qsValue, id) => {
  return new Promise((resolve, reject) => {
    const qs = `UPDATE tb_account SET ? WHERE id_account = ?`;
    dbMySql.query(qs, [qsValue, id], (err) => {
      if (err) {
        reject(err);
      } else {
        const qsUpdated =
          "SELECT id_account,username,phone_number,role,photo_profile from tb_account WHERE id_account = ?";
        dbMySql.query(qsUpdated, id, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
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
  getUsersInfo,
  updateAccount,
  deleteAccount,
};
