const Router = require("express").Router();
const classHandler = require("../handlers/class");
const verifyToken = require("../middlewares/verifyToken");
//-------------------------------Student
Router.get("/myClass", verifyToken, classHandler.getMyClass);
Router.get("/newClass", verifyToken, classHandler.getNewClass);
Router.get(
  "/subjectClass/:id_class",
  verifyToken,
  classHandler.getSubjectClass
);
Router.post("/register", classHandler.registerClass);
//-------------------------------FACILITATOR
Router.get("/list", classHandler.getAllClassAndStudent);
Router.get("/members/:id_class", classHandler.getMemberClass);
Router.get(
  "/members/subject/:id_account.:id_class",
  classHandler.getMemberSubjectClass
);
Router.post("/", classHandler.createClass);
Router.post("/subject", classHandler.createSubjectClass);
Router.patch("/:id_class", classHandler.updateClass);
Router.patch("/subject/:id_subject", classHandler.updateSubjectClass);
Router.patch("/addScore", classHandler.updateScore);
Router.delete("/:id_class", classHandler.deleteClass);
Router.delete("/subject/:id_subject", classHandler.deleteSubjectClass);
//===============PUBLIC===================
Router.get("/", classHandler.getAllClass);
module.exports = Router;
