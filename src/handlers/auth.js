const authModel = require("../models/auth");
const { writeResponse, writeError } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      const validPass = await bcrypt.compare(password, result.password);
      const headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "x-access-token": "token",
      };
      if (!validPass) {
        return res.status(400).send("password salah!");
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
      result = await authModel.postResetPassword([hashPassword, result.id]);
      writeResponse(res, headers, 200, result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  postLogin,
  postResetPassword,
};
