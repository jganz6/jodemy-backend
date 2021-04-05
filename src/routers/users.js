const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
Router.get("/", verified, usersHandler.getUsersInfo);
Router.patch("/update", verified, usersHandler.getUsersInfo);
Router.delete("/delete", verified, usersHandler.getUsersInfo);

module.exports = Router;
