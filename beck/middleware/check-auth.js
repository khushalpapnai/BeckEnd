const jwt = require("jsonwebtoken");

const Httperror = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.Jwt_Key);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Httperror("Authentication failed!", 401);
    return next(error);
  }
};
