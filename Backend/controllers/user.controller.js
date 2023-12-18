const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("you can only update your account");
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(401).json("User not found or unable to update");
    }
    const { password, ...restOfElements } = updatedUser.toObject();
    res.status(200).json(restOfElements);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal service error");
  }
};

module.exports = {
  test,
  updateUser,
};
