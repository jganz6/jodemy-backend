const usersModel = require("../models/users");
const response = require("../helpers/response");

const getUsersInfo = async (req, res) => {
  try {
    const result = await usersModel.getUsersInfo(req.id_account);
    response(res, null, result, 200, true);
  } catch (error) {
    response(res, "failed", { error }, 400, false);
  }
};

module.exports = {
  getUsersInfo,
};
