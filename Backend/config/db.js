const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.mongoDB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected..!");
  })
  .catch((err) => {
    console.log("Error connecting database: " + err);
  });
