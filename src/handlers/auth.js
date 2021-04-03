const authModel = require("../models/auth");
const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      const validPass = await bcrypt.compare(password, result.password);
      if (!validPass) {
        return response(res, "Failed", { error: "Wrong Password" }, 400, false);
      } else {
        const token = jwt.sign({ _id: result.id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token);
        response(res, null, { token: token }, 200, true);
      }
    }
  } catch (err) {
    if (err) response(res, "Failed", { err }, 400, false);
  }
};
const postResetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      const resultFinal = await authModel.postResetPassword([
        hashPassword,
        result.id,
      ]);
      response(res, null, { resultFinal }, 200, true);
    }
  } catch (err) {
    response(res, "Error", { err }, 400, false);
  }
};
const postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      return response(
        res,
        "Failed",
        { error: "Email Already Exist" },
        400,
        false
      );
    }
  } catch (err) {
    const resultFinal = await authModel.postRegister([
      email,
      hashPassword,
      username,
    ]);
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      // "x-access-token": "token",
    };
    res.header(headers);
    response(res, null, { resultFinal }, 200, true);
  }
};
const updateAccount = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await authModel.updateAccount(updateValue, req.query.id);
    response(res, null, { result }, 200, true);
  } catch (err) {
    response(res, "Error", err, 400, false);
  }
};
const deleteAccount = async (req, res) => {
  try {
    const result = await authModel.deleteAccount(req.query.id);
    response(res, null, { result }, 200, true);
  } catch (err) {
    response(res, "Error", { err }, 400, false);
  }
};

module.exports = {
  postLogin,
  postResetPassword,
  postRegister,
  updateAccount,
  deleteAccount,
};
