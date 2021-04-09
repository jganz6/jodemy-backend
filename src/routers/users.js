const Router = require("express").Router();
const usersHandler = require("../handlers/users");
const verified = require("../middlewares/verifyToken");
const multerUploadImage = require("../middlewares/uploadImages");
Router.get("/", verified, usersHandler.getUsersInfo);
Router.patch(
  "/",
  verified,
  multerUploadImage.single("image"),
  usersHandler.updateAccount
);
Router.delete("/", verified, usersHandler.deleteAccount);

module.exports = Router;
