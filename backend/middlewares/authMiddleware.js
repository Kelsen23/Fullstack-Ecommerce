import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asynchandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      error.statusCode = 401;
      error.message = "Not authorized, token failed.";
      throw error;
    }
  } else {
    const error = new Error("Not authorized, no token.");
    error.statusCode = 401;
    throw error;
  }
});

const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizedAdmin };
