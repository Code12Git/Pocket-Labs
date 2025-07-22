const { expenseManager, responseManager } = require('../services')

const create = async (request,response) => {
    try{
        const result = await expenseManager.createExpense(request.user,request.body)
        return responseManager.sendSuccessResponse(response,result,'Expense Created Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Expense Cannot be Created!')
    }
}

const get = async (request,response) => {
    try{
        const result = await expenseManager.getMyExpenses(request.user)
        return responseManager.sendSuccessResponse(response,result,'Expense fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Expense Cannot be fetched!')
    }
}

module.exports = { create ,get }