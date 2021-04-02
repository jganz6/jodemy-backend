const authModel = require("../models/auth");
const { writeResponse } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      const validPass = await bcrypt.compare(password, result.password);
      if (!validPass) {
        return res.status(400).send("Wrong Password!");
      } else {
        const token = jwt.sign({ _id: result.id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).status(200).send(token);
      }
    }
  } catch (err) {
    if (err) res.status(400).send(err);
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
      writeResponse(res, null, 200, resultFinal);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const postRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      return res.status(400).send("Email Already Exist!");
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
    writeResponse(res, headers, 200, resultFinal);
  }
};
const updateAccount = async (req, res) => {
  const updateValue = req.body;
  try {
    const result = await authModel.updateAccount([
      ...updateValue,
      req.query.id,
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
const deleteAccount = async (req, res) => {
  try {
    const result = await authModel.deleteAccount(req.query.id);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  postLogin,
  postResetPassword,
  postRegister,
  updateAccount,
  deleteAccount,
};
