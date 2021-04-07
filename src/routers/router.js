const Router = require("express").Router();
const pingRouter = require("./ping");
const authRouter = require("./auth");
const classRouter = require("./class");
const usersRouter = require("./users");

const multerUploadImage = require("../middlewares/uploadImage");

Router.use("/ping", pingRouter);
Router.use("/auth", authRouter);
Router.use("/class", classRouter);
Router.use("/users", usersRouter);

Router.post("/upload", multerUploadImage.single("image"), (req, res) => {
  const { file } = req;
  const url = `/images/${file.filename}`;
  res.status(200).json({
    msg: "Upload Success",
    url,
  });
});

// roles = student / facilitator
// /student/class
// /facilitator/class
module.exports = Router;
