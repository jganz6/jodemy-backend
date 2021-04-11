const authModel = require("../models/auth");
const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const postLogout = async (req, res) => {
  const token = req.header("auth-token");
  try {
    const result = await authModel.postLogout(token);
    response(res, "Success", result, 200, true);
  } catch (err) {
    response(res, "Failed", { err }, 400, false);
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authModel.postValidation(email);
    if (result) {
      const validPass = await bcrypt.compare(password, result.password);
      if (!validPass) {
        return response(
          res,
          "Failed",
          { error: "Wrong Email or Password" },
          400,
          false
        );
      } else {
        const options = {
          expiresIn: process.env.EXPIRE,
          issuer: process.env.ISSUER,
        };
        const token = jwt.sign(
          { _id: result.id, _role: result.role },
          process.env.TOKEN_SECRET,
          options
        );
        res.header("auth-token", token);
        response(res, null, { token: token }, 200, true);
      }
    }
  } catch (err) {
    if (err)
      response(res, "Failed", { error: "Wrong Email or Password" }, 400, false);
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
    response(res, null, { resultFinal }, 200, true);
  }
};

module.exports = {
  postLogin,
  postResetPassword,
  postRegister,
  postLogout,
};
