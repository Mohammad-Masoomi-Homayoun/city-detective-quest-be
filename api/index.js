require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("../Backend/config/db");

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require("../Backend/routes");
app.use("/api", apiRouter);

module.exports = app;
