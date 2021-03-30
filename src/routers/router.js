const Router = require("express").Router();
const pingRouter = require("./ping");
const usersRouter = require("./users");
const authRouter = require("./auth");
const classRouter = require("./class");
Router.use("/ping", pingRouter);
Router.use("/auth", authRouter);
Router.use("/class", classRouter);

module.exports = Router;
