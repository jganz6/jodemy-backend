const Router = require("express").Router();
const { response } = require("express");
const usersHandler = require("../models/users");
Router.get("/", usersHandler.getUsersWithRole);
module.exports = Router;
