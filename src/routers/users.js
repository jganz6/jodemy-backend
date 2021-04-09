const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
const multerUploadImage = require("../middlewares/uploadImages");
Router.get("/", verified.allRole, usersHandler.getUsersInfo);
Router.patch(
  "/",
  verified.allRole,
  multerUploadImage.single("image"),
  usersHandler.updateAccount
);
Router.delete("/", verified.allRole, usersHandler.deleteAccount);

module.exports = Router;
