const Router = require("express").Router();
const authHandler = require("../handlers/auth");
const verified = require("../middlewares/verifyToken");
Router.post("/login", authHandler.postLogin);
Router.post("/resetPassword", verified.allRole, authHandler.postResetPassword);
Router.post("/sendOTP", authHandler.sendOTP);
Router.post("/verifyOTP", authHandler.verifyOTP);
Router.post("/register", authHandler.postRegister);
Router.post("/logout", verified.allRole, authHandler.postLogout);
module.exports = Router;
