const Router = require("express").Router();
const authHandler = require("../handlers/auth");
const verified = require("../middlewares/verifyToken");
Router.post("/login", authHandler.postLogin);
Router.post("/resetPassword", authHandler.postResetPassword);
Router.post("/register", authHandler.postRegister);
Router.post("/logout", verified.allRole, authHandler.postLogout);
module.exports = Router;
