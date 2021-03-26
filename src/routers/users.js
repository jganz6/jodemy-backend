const Router = require("express").Router();
const usersHandler = require("../handlers/users");
Router.get("/", usersHandler.getUsers);
module.exports = Router;
