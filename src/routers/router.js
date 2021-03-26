const Router = require("express").Router();
const pingRouter = require("./ping");
const usersRouter = require("./users");
Router.use("/ping", pingRouter);
Router.use("/users", usersRouter);

Router.post("/", (req, res) => {
  //  console.log(req.body);
  res.send(req.body);
});

module.exports = Router;
