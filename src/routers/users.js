const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
Router.get("/", verified, usersHandler.getUsersInfo);

module.exports = Router;
