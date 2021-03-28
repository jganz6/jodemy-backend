const Router = require("express").Router();
const pingRouter = require("./ping");
const usersRouter = require("./users");
const authRouter = require("./auth");
const classRouter = require("./class");
Router.use("/ping", pingRouter);
Router.use("/users", usersRouter);
Router.use("/auth", authRouter);
Router.use("/class", classRouter);

Router.post("/", (req, res) => {
  //  console.log(req.body);
  res.send(req.body);
});

module.exports = Router;
