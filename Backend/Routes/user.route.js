const express = require("express");
const { test } = require("../controllers/user.controller");

const userrouter = express.Router();

userrouter.get("/", test);

module.exports = userrouter;
