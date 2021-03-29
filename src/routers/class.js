const Router = require("express").Router();
const classHandler = require("../handlers/class");
Router.get("/", classHandler.getAllClass);
Router.get("/getMyClass/:id_account", classHandler.getMyClass);
Router.get("/getNewClass/:id_account", classHandler.getNewClass);
Router.get("/getSubjectClass/:id_account", classHandler.getSubjectClass);
Router.get("/getMemberClass/:id_class", classHandler.getMemberClass);
Router.get(
  "/getMemberSubjectClass/:id_account.:id_class",
  classHandler.getMemberSubjectClass
);
Router.post("/createClass", classHandler.createClass);
Router.post("/createSubjectClass", classHandler.createClass);
Router.delete("/deleteClass/:id_class", classHandler.deleteClass);
Router.delete("/deleteSubjectClass/:id_class", classHandler.deleteSubjectClass);
module.exports = Router;
