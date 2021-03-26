const Router = require("express").Router();
const authHandler = require("../handlers/auth");
Router.post("/login", authHandler.postLogin);

module.exports = Router;
