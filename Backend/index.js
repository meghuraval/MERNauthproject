const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

try {
  mongoose.connect(process.env.MONGO);
} catch (error) {
  console.log(error);
}

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("hello the method is: " + req.method));

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
