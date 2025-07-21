const User = require('../models/user');
const { BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED } = require('../utils/errors');
const { AppError } = require('../utils');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { fromEnv } = require('../utils');

const register = async (body) => {
  const { name, username, email, password } = body;

  if (_.isEmpty(name) || _.isEmpty(username) || _.isEmpty(email) || _.isEmpty(password)) {
    const error = { ...BAD_REQUEST, message: "All fields are required" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    const error = { ...CONFLICT, message: "User already exists" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const newUser = new User({ name, username, email, password }); 
  await newUser.save();

  return newUser;
};

const login = async (body) => {
  const { username, password } = body;

  if (_.isEmpty(username) || _.isEmpty(password)) {
    const error = { ...BAD_REQUEST, message: "Please enter all required fields" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const user = await User.findOne({ username });
  if (!user) {
    const error = { ...NOT_FOUND, message: "User does not exist" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = { ...UNAUTHORIZED, message: "Invalid credentials" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, fromEnv('SECRET_KEY'), {
    expiresIn: '1d'
  });

  return { user: _.omit(user.toObject(), ['password']), token };
};

module.exports = { register, login };
