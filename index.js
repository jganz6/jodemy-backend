require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const app = express();
const Router = require("./src/routers/router");
app.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(Router);
