const _ = require('lodash');
const jwt = require('jsonwebtoken')
const { fromEnv, AppError } = require('../utils')
const { userModel } = require('../models')
const { NOT_FOUND, INVALID_ACCESS_TOKEN, NO_AUTH_HEADER } = require('../utils/errors')



const verifyToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (_.isEmpty(authorization)) {
            const error = NO_AUTH_HEADER;
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const accessToken = authorization.split(" ")[1];
        if (!accessToken) {
            const error = INVALID_ACCESS_TOKEN;
            throw new AppError(error.code, error.message, error.statusCode);
        }
        const decodedToken = jwt.verify(accessToken, fromEnv('SECRET_KEY'));
        const user = await userModel.findOne({ email: decodedToken.email });
        if (_.isEmpty(user)) {
            const error = NOT_FOUND;
            throw new AppError(error.code, error.message, error.statusCode);
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};


const verifyTokenAndAdmin = (request, response, next) => {
    try {
        verifyToken(request, response, () => {

            if (request.user.role === 'admin') {
                next();
            } else {
                const err = new Error('Unauthorized: Admin access required');
                err.status = 403;
                throw err;
            }
        });
    } catch (err) {
        next(err);
    }
};


module.exports = { verifyToken, verifyTokenAndAdmin }