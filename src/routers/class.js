const Router = require("express").Router();
const classHandler = require("../handlers/class");
Router.get("/", classHandler.getAllClass);
Router.get("/getMyClass/:content", classHandler.getMyClass);
Router.get("/getNewClass/:content", classHandler.getNewClass);
Router.get("/getSubjectClass/:content", classHandler.getSubjectClass);
Router.post("/createClass", classHandler.createClass);
Router.post("/createSubjectClass", classHandler.createClass);
module.exports = Router;
