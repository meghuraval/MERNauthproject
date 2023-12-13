const express = require("express");
const signup = require("../controllers/auth.controller");

//Defines the route using Express Router for handling the POST request to /signup.
//Assigns the request to the corresponding controller function (signup) responsible for handling the creation of the user.
const authrouter = express.Router();

authrouter.post("/signup", signup);

module.exports = authrouter;
