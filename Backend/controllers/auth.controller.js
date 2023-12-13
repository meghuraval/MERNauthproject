const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
    //the id value in mongodb is writte as _id, its good to use _id to check and give token, becuase the id is very unique and hard to find which is more secure rather than email and password.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...restOfElements } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restOfElements);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
