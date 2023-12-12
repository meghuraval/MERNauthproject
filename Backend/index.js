const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userrouter = require("./Routes/user.route");
const authrouter = require("./Routes/auth.route");

const dotenv = require("dotenv");

dotenv.config();

try {
  mongoose.connect(process.env.MONGO);
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/user", userrouter);
app.use("/api/auth", authrouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port: " + process.env.PORT);
});
