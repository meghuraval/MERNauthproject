const express = require("express");
const signup = require("../controllers/auth.controller");

const authrouter = express.Router();

authrouter.post("/signup", signup);

module.exports = authrouter;
