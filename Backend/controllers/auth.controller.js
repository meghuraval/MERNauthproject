const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signup = async (req, res, next) => {
  //the below 4 lines create the newuser object based on teh inputs received from the front end without any validations
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  //these below 5 lines will validate the created newuser object to see wheether the values received match with the user schema before saving the newuser to teh database, if any errors occur it will send an error back or else it will accept the newuser object and add it to the database.
  try {
    await newUser.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};
module.exports = signup;
