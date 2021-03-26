const loginModel = require("../models/login");
const mysql = require("mysql");
const { writeResponse, writeError } = require("../helpers/response");

const postLogin = (req, res) => {
  const { email, password } = req.body;
  loginModel
    .postLogin([email, password])
    .then((result) => {
      const headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "x-access-token": "token",
      };
      writeResponse(res, headers, 200, result);
    })
    .catch((err) => {
      if (err) writeError(res, 500, err);
    });
};

module.exports = {
  postLogin,
};
