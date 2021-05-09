const Router = require("express").Router();

const mid1 = require("../middlewares/mid1");
const mid2 = require("../middlewares/mid2");

const pingHandler = require("../handlers/ping");

// domain/ping
Router.get("/", mid1, pingHandler.pong);
// domain/ping/pog
Router.get("/pog", mid2, pingHandler.champ);

module.exports = Router;
