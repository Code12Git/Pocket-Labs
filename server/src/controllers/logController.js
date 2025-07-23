const { expenseModel } = require("../models")
const { responseManager, logManager } = require("../services")

const getAll = async (request,response) => {
    try{
        const result = await logManager.getAll()
        return responseManager.sendSuccessResponse(response,result,'Logs fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'No logs can be fetched!')
    }
}

module.exports = {getAll}