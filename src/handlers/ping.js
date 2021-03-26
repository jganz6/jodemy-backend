const { writeResponse } = require("../helpers/response");

const pong = (req, res) => {
  console.log("pong");
  // res.status(204).send();
  writeResponse(res, null, 204, null);
};

const champ = (req, res) => {
  console.log("champ");
  // res.status(204).send();
  writeResponse(res, null, 204, null);
};

module.exports = {
  pong, // pong: pong
  champ, // champ: champ
};
