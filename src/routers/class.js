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
Router.post("/create", classHandler.createClass);
Router.post("/create/subject", classHandler.createSubjectClass);
Router.post(
  "/updateSubReport/:id_class.:id_subject",
  classHandler.updateSubReport
);
Router.patch("/update", classHandler.updateClass);
Router.patch("/update/subject", classHandler.updateSubjectClass);
Router.patch("/addScore", classHandler.updateScore);
Router.delete("/delete/:id_class", classHandler.deleteClass);
Router.delete("/delete/subject/:id_class", classHandler.deleteSubjectClass);
//===============PUBLIC===================
Router.get("/", classHandler.getAllClass);
module.exports = Router;
