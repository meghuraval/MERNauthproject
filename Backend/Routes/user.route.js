const express = require("express");
const { test, updateUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyuser");

const userrouter = express.Router();

userrouter.get("/", test);
userrouter.post("/update/:id", verifyToken, updateUser);

module.exports = userrouter;
