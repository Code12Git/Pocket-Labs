const { BAD_REQUEST, NOT_FOUND } = require('../utils/errors');
const { AppError } = require('../utils');
const _ = require('lodash');
const {expenseModel} = require('../models')


// Create Expenses
const createExpense = async (user, body) => {
    const { amount, category, date, notes } = body;

    console.log(user)
    console.log(amount,category,date,notes,'trigger')
    try {
        if (!amount ||  _.isEmpty(category) || _.isEmpty(date)) {
            throw new AppError(BAD_REQUEST.code, 'Amount, category, and date are required', BAD_REQUEST.statusCode);
         }

        const expense = await expenseModel.create({ employeeId: user._id , amount, category, date, notes });
        return expense;
    } catch (err) {
        throw err;
    }
};


// Get my expenses
const getMyExpenses = async (user) => {
    try {
        // Correct way to find expenses by employee ID
        return await expenseModel.find({ employeeId: user._id }).sort({ createdAt: -1 });
    } catch(err) {
        console.error("Error fetching expenses:", err);
        throw err;
    }
};


// Get All Expenses
const getAllExpenses = async (user, query) => {

    const { status, category, startDate, endDate } = query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    return await expenseModel.find(filter).populate('employee', 'name email').sort({ date: -1 });
};



// Updating Expense Status
const updateExpenseStatus = async (user, expenseId, status) => {

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) throw new AppError(BAD_REQUEST.code, 'Invalid status value', BAD_REQUEST.statusCode);
    

    const expense = await expenseModel.findById(expenseId);
    if (!expense) throw new AppError(NOT_FOUND.code, 'Expense not found', NOT_FOUND.statusCode);
    

    expense.status = status;
    await expense.save();
    return expense;
};

module.exports = { createExpense, getMyExpenses, getAllExpenses, updateExpenseStatus };
