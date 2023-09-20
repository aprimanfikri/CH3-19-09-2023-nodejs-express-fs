const express = require("express");
const morgan = require("morgan");
const app = express();
const tour = require("../routes/tour");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", tour);

module.exports = app;
