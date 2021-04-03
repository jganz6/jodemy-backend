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
Router.post("/registerClass", classHandler.registerClass);
//-------------------------------FACILITATOR
Router.get("/getAllClassAndStudent", classHandler.getAllClassAndStudent);
Router.get("/getMemberClass/:id_class", classHandler.getMemberClass);
Router.get(
  "/getMemberSubjectClass/:id_account.:id_class",
  classHandler.getMemberSubjectClass
);
Router.post("/createClass", classHandler.createClass);
Router.post("/createSubjectClass", classHandler.createSubjectClass);
Router.post(
  "/updateSubReport/:id_class.:id_subject",
  classHandler.updateSubReport
);
Router.patch("/updateClass", classHandler.updateClass);
Router.patch("/updateSubjectClass", classHandler.updateSubjectClass);
Router.patch("/updateScore", classHandler.updateScore);
Router.delete("/deleteClass/:id_class", classHandler.deleteClass);
Router.delete("/deleteSubjectClass/:id_class", classHandler.deleteSubjectClass);
//===============PUBLIC===================
Router.get("/", classHandler.getAllClass);
module.exports = Router;
