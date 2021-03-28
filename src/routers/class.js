const Router = require("express").Router();
const classHandler = require("../handlers/class");
Router.get("/", classHandler.getAllClass);
Router.post("/createClass", classHandler.createClass);
module.exports = Router;
