const express = require("express");
const {
  notARoute,
  handlesServerErrors,
  handlesPSQLErrors,
  handlesCustomErrors,
} = require("./controllers/errors.controllers");
const apiRouter = require("./routes/api-router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.all("*", notARoute);

app.use(handlesPSQLErrors);
app.use(handlesCustomErrors);
app.use(handlesServerErrors);

module.exports = app;
