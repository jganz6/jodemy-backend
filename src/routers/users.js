const Router = require("express").Router();
const verifyToken = require("./../middlewares/verifyToken");
const usersHandler = require("../handlers/users");
Router.get("/", verifyToken, usersHandler.getUsers);
module.exports = Router;
