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

const getAll = async (request,response) => {
    try{
        const result = await expenseManager.getAllExpenses()
        return responseManager.sendSuccessResponse(response,result,'Expenses fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Expenses Cannot be fetched!')
    }
}

const updateStatus = async (request,response) => {
    try{
        const result = await expenseManager.updateExpenseStatus(request.params,request.body,request.user)
        return responseManager.sendSuccessResponse(response,result,'Expenses Status Updated Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Expenses Cannot be updated successfully!')
    }
}


const getAllByQuery = async (request,response) => {
    try{
        const result = await expenseManager.getAllExpensesByQuery(request.query)
        return responseManager.sendSuccessResponse(response,result,'Expenses fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Expenses Cannot be fetched!')
    }
}


const totalExpenses = async (request,response) => {
    try{
        const result = await expenseManager.totalExpenses(request.query)
        return responseManager.sendSuccessResponse(response,result,'Total Expenses fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Total Expenses Cannot be fetched!')
    }
}   


const expenseOverTime = async (request,response) => {
    try{
        const result = await expenseManager.expensesOverTime()
        return responseManager.sendSuccessResponse(response,result,'Expenses Over Time fetched Successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,' Expenses Over Time  Cannot be fetched!')
    }
}

module.exports = { create ,get, getAll, updateStatus, getAllByQuery,totalExpenses, expenseOverTime }