const { BAD_REQUEST, NOT_FOUND } = require('../utils/errors');
const { AppError } = require('../utils');
const _ = require('lodash');
const { expenseModel, logModel } = require('../models');


// Create Expenses
const createExpense = async (user, body) => {
    const { amount, category, date, notes } = body;

    try {
        if (!amount || _.isEmpty(category) || _.isEmpty(date)) {
            throw new AppError(BAD_REQUEST.code, 'Amount, category, and date are required', BAD_REQUEST.statusCode);
        }

        const expense = await expenseModel.create({ employeeId: user._id, amount, category, date, notes });
        await logModel.create({ userId: user._id, actionType: 'CREATE_EXPENSE', description: `Expense of ₹${amount} created in category ${category}`, expenseId: expense._id });
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
    } catch (err) {
        console.error("Error fetching expenses:", err);
        throw err;
    }
};


// Get All Expenses
const getAllExpenses = async () => {
    try {
        const expenses = await expenseModel.find().sort({ date: -1 });
        if (expenses.length === 0) return ({ ...NOT_FOUND, message: 'No expenses found!' })
        return expenses;
    } catch (err) {
        throw err;
    }
};



// Updating Expense Status
const updateExpenseStatus = async (params, body, user) => {
    const { expenseId } = params;
    const { status } = body;
    try {
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) throw new AppError({ ...BAD_REQUEST, message: 'It should contain valid status' });
        const expense = await expenseModel.findById(expenseId);
        if (!expense) throw new AppError(NOT_FOUND.code, 'Expense not found', NOT_FOUND.statusCode);
        expense.status = status;
        await expense.save();
        await logModel.create({ userId: user._id, actionType: 'STATUS_CHANGE', description: `Status updated to '${status}' for expense ₹${expense.amount} in category ${expense.category} by ${user.name}`, expenseId: expense._id });
        return expense;
    } catch (err) {
        throw err;
    }

};

// Total Expenses per category

const totalExpenses = async () => {
    try {
      const totalExpense = await expenseModel.aggregate([{ $group: { _id: "$category", totalAmount: { $sum: "$amount" }}},
        {
          $project: {
            category: "$_id",
            totalAmount: 1,
            _id: 0
          }
        }
      ]);
      return totalExpense;
    } catch (err) {
      throw err;
    }
  };
  

// Expenses OVer Time

  const expensesOverTime = async () => {
    try {
      const expenses = await expenseModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" }
            },
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        },
        {
          $project: {
            year: "$_id.year",
            month: "$_id.month",
            totalAmount: 1,
            _id: 0
          }
        }
      ]);
      return expenses;
    } catch (err) {
      throw new AppError({ message: 'Failed to get expenses over time', originalError: err });
    }
  };

// Fetch By Query

const getAllExpensesByQuery = async (query) => {
    try {
        const filter = {};

        const { category, startDate, endDate } = query;
        console.log(category,startDate,endDate)
        if(category){
            filter.category = category.toLowerCase();
        }
        if (startDate && endDate) {
            filter.date = { $gte:new Date(startDate), $lte:new Date(endDate)}
        }

        const expenses = await expenseModel.find(filter).lean()
        console.log(expenses)
        if (expenses.length === 0) throw new AppError({ ...NOT_FOUND, message: 'Expenses not found!' })
        return expenses;

    } catch (err) {
        throw err;
    }
};

module.exports = { createExpense, getMyExpenses, getAllExpenses, updateExpenseStatus, getAllExpensesByQuery, totalExpenses, expensesOverTime };
