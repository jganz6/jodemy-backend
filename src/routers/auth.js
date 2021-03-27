const Router = require("express").Router();
const authHandler = require("../handlers/auth");
Router.post("/login", authHandler.postLogin);
Router.post("/resetPassword", authHandler.postResetPassword);
Router.post("/register", authHandler.postRegister);
module.exports = Router;
