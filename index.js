require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./src/routers/router");
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
const jsonParser = express.json();
// content-type = application/x-www-form-urlencoded
// body x-www-form-urlencoded
const urlEncodedParser = express.urlencoded({ extended: false });
app.use(logger("dev"));
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"));
app.use(Router);
