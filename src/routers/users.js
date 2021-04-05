const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
Router.get("/", verified, usersHandler.getUsersInfo);
Router.patch("/update", verified, usersHandler.updateAccount);
Router.delete("/delete", verified, usersHandler.deleteAccount);

module.exports = Router;
