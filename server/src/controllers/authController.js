const { authManager, responseManager } = require('../services')

const register = async (request, response) => {
    try {
        const result = await authManager.register(request.body)
        return responseManager.sendSuccessResponse(response, result, "User registered successfully")
    } catch (err) {
        return responseManager.sendErrorResponse(response, err, "User registration failed")
    }
}


const login = async (request, response) => {
    try {
        const result = await authManager.login(request.body)
        return responseManager.sendSuccessResponse(response, result, "User logged in successfully")
    } catch (err) {
        return responseManager.sendErrorResponse(response, err, "User login failed")
    }
}



module.exports = { register, login }