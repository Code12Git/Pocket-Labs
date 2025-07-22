const { BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED } = require('../utils/errors');
const { AppError } = require('../utils');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { fromEnv } = require('../utils');
const { userModel } = require('../models');

const register = async (body) => {
  const { name, username, email, password } = body;

  if (_.isEmpty(name) || _.isEmpty(username) || _.isEmpty(email) || _.isEmpty(password)) {
    const error = { ...BAD_REQUEST, message: "All fields are required" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    const error = { ...CONFLICT, message: "User already exists" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const newUser = new userModel({ name, username, email, password }); 
  await newUser.save();

  return newUser;
};

const login = async (body) => {
  const { email, password } = body;
  console.log("Triggered:",body)
  if (_.isEmpty(email) || _.isEmpty(password)) {
    const error = { ...BAD_REQUEST, message: "Please enter all required fields" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const user = await userModel.findOne( {email} );
  if (!user) {
    const error = { ...NOT_FOUND, message: "User does not exist" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = { ...UNAUTHORIZED, message: "Invalid credentials" };
    throw new AppError(error.code, error.message, error.statusCode);
  }

  const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, fromEnv('SECRET_KEY'), {
    expiresIn: '1d'
  });

  return { user: _.omit(user.toObject(), ['password']), token };
};



const adminLogin = async (body) => {
  const {email,password} = body;
  try{
    if(_.isEmpty(email) || _.isEmpty(password)) throw new AppError({...BAD_REQUEST,message:'Email and password are required!'});

    if(email !== fromEnv('ADMIN_EMAIL') || password !== fromEnv('ADMIN_PASSWORD')) throw new AppError({...NOT_FOUND,message:'Admin not exists!'})

    const token = jwt.sign({  email, role: 'admin' }, fromEnv('SECRET_KEY'), { expiresIn: '1d' });
    
    return { token }
  }catch(err){
    throw err;
  }
}

module.exports = { register, login, adminLogin };
