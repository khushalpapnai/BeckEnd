const { validationResult } = require("express-validator");
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

const Httperror = require("../models/http-error");
const UUID = require("uuid/v4.js");
const User = require("../models/user");

const getusers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); //"email,name" also can be use
  } catch (err) {
    const error = new Httperror("can't fetch user please try again", 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const singup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Httperror("invalid input please check your data", 422));
  }
  const { name, email, password } = req.body;

  let existing;
  try {
    existing = await User.findOne({ email: email });
    if (existing) {
      const error = new Httperror("user already exist!! use login ", 422);
      return next(error);
    }
  } catch (err) {
    const error = new Httperror("singup faild !! please try again", 500);
    return next(error);
  }
  if (existing) {
    const error = new Httperror(
      "user exists already,please longin instead.",
      422
    );
    return next(error);
  }
  let hashpassword;
  try {
    hashpassword = await Bcrypt.hash(password, 12);
  } catch (err) {
    const error = new Httperror("faild to  create password", 500);
    return next(error);
  }

  const createduser = new User({
    name,
    image: req.file.path,

    email,
    password: hashpassword,
    place: [],
  });

  try {
    await createduser.save();
  } catch (err) {
    const error = new Httperror("faild to singup!!, try again", 500);
    return next(error);
  }
  let token;
  try {
    token = Jwt.sign(
      { userId: createduser.id, email: createduser.email },
      process.env.Jwt_Key,
      { expiresIn: "2h" }
    );
  } catch {
    const error = new Httperror("faild to singup!!, try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createduser.id, email: createduser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existing;
  try {
    existing = await User.findOne({ email: email });
  } catch (err) {
    const error = new Httperror("login faild !! please try again", 500);
    return next(error);
  }

  if (!existing) {
    const error = new Httperror("not user found", 401);
    return next(error);
  }
  let isvalidpassword = false;
  try {
    isvalidpassword = await Bcrypt.compare(password, existing.password);
  } catch (err) {
    const error = new Httperror("the password is bing incorect", 500);
    return next(error);
  }

  if (!isvalidpassword) {
    const error = new Httperror("incorect email and password", 401);
    return next(error);
  }
  let token;
  try {
    token = Jwt.sign(
      { userId: existing.id, email: existing.email },
      process.env.Jwt_Key,
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new Httperror("faild to login you", 500);
    return next(error);
  }
  res.json({
    userId: existing.id,
    email: existing.email,
    token: token,
  });
};

exports.getusers = getusers;
exports.singup = singup;
exports.login = login;
