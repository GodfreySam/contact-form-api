const express = require("express");
const logger = require("morgan");
const routers = require("./routes/index");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

routers(app);

app.use(logger("dev"));

module.exports = app;
