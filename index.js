require("dotenv").config();
const express = require("express");
const app = express();
const Router = require("./src/routers/router");
app.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
// const urlEndcodedParser = express.urlencoded();
app.use(express.json());
app.use(express.urlencoded());
// app.use(urlEndcodedParser);
app.use(Router);
