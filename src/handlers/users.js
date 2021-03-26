const usersModel = require("../models/users");

const { writeResponse, writeError } = require("../helpers/response");

const getUsers = (req, res) => {
  usersModel
    .getUsers()
    .then((result) => {
      const headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "x-access-token": "token",
      };
      writeResponse(res, headers, 200, result);
      // const response = {
      //   success: true,
      //   result,
      // };
      // res
      //   .header("Access-Control-Allow-Origin", "http://localhost:3000")
      //   .status(200)
      //   .json(response);
    })
    .catch((err) => {
      // writeError(res, header, status, err)
      if (err) writeError(res, 500, err);
    });
};

module.exports = {
  getUsers,
};
