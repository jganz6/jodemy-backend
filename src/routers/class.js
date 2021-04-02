const Router = require("express").Router();
const classHandler = require("../handlers/class");
//-------------------------------Student
Router.get("/getMyClass/:id_account", classHandler.getMyClass);
Router.get("/getNewClass/:id_account", classHandler.getNewClass);
Router.get("/getSubjectClass/:id_account", classHandler.getSubjectClass);
Router.post("/registerClass", classHandler.registerClass);
//-------------------------------FACILITATOR
Router.get(
  "/getMemberSubjectClass/:id_account.:id_class",
  classHandler.getMemberSubjectClass
);
Router.post("/createClass", classHandler.createClass);
Router.post("/createSubjectClass", classHandler.createSubjectClass);
Router.delete("/deleteClass/:id_class", classHandler.deleteClass);
Router.delete("/deleteSubjectClass/:id_class", classHandler.deleteSubjectClass);
Router.post(
  "/updateSubReport/:id_class.:id_subject",
  classHandler.updateSubReport
);
Router.get("/getMemberClass/:id_class", classHandler.getMemberClass);
Router.get("/getAllClassAndStudent", classHandler.getAllClassAndStudent);
Router.patch("/updateClass", classHandler.updateClass);
Router.patch("/updateSubjectClass", classHandler.updateSubjectClass);
Router.patch("/updateScore", classHandler.updateScore);
//===============PUBLIC===================
Router.get("/", classHandler.getAllClass);
module.exports = Router;
