import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const error = new Error("Please fill all the inputs.");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ email });

  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    createToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!email || !password) {
    const error = new Error("Please fill all the inputs.");
    error.statusCode = 400;
    throw error;
  }

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      const error = new Error("Password Invalid.");
      error.statusCode = 400;
      throw error;
    }
  } else {
    const error = new Error("User doesn't exits.");
    error.statusCode = 400;
    throw error;
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Loggged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      const error = new Error("Admin cannot be deleted.");
      error.statusCode = 400;
      throw error;
    } else {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: `User with username of: ${user.username} deleted` });
    }
  } else {
    const error = new Error(`User with id of ${req.params.id} doesn't exist.`);
    error.statusCode = 404;
    throw error;
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.params.id).select("-password");

  if (!foundUser) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  } else {
    res.status(200).json({
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.params.id);

  if (foundUser) {
    foundUser.username = req.body.username || foundUser.username;
    foundUser.email = req.body.email || foundUser.email;
    foundUser.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await foundUser.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
};
