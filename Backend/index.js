const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userrouter = require("./Routes/user.route");

const dotenv = require("dotenv");
dotenv.config();

try {
  mongoose.connect(process.env.MONGO);
} catch (error) {
  console.log(error);
}

const app = express();

app.use(morgan("dev"));

app.use("/api/user", userrouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
