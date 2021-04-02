const Router = require("express").Router();
const pingRouter = require("./ping");
const authRouter = require("./auth");
const classRouter = require("./class");
Router.use("/ping", pingRouter);
Router.use("/auth", authRouter);
Router.use("/class", classRouter);

// roles = student / facilitator
// /student/class
// /facilitator/class
module.exports = Router;
