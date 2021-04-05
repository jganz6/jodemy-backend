const usersModel = require("../models/users");
const response = require("../helpers/response");

const getUsersInfo = async (req, res) => {
  console.log(req.user._id);
  try {
    const result = await usersModel.getUsersInfo(req.user._id);
    response(res, null, ...result, 200, true);
  } catch (error) {
    response(res, "failed", { error }, 400, false);
  }
};
const updateAccount = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await usersModel.updateAccount(updateValue, req.user._id);
    response(res, null, { result }, 200, true);
  } catch (err) {
    response(res, "Error", err, 400, false);
  }
};
const deleteAccount = async (req, res) => {
  try {
    const result = await usersModel.deleteAccount(req.user._id);
    response(res, null, { result }, 200, true);
  } catch (err) {
    response(res, "Error", { err }, 400, false);
  }
};
module.exports = {
  getUsersInfo,
  updateAccount,
  deleteAccount,
};
