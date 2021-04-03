const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const getUser = require("../middlewares/users");
Router.get("/:id_account", getUser, usersHandler.getUsersInfo);

module.exports = Router;
