const errorAsync = require('express-async-handler')
const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")


const protect = errorAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized! Token Failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized! Token Failed");
  }
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };