const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
Router.get("/", verified, usersHandler.getUsersInfo);
Router.patch("/", verified, usersHandler.updateAccount);
Router.delete("/", verified, usersHandler.deleteAccount);

module.exports = Router;
