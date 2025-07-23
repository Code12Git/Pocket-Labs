const express = require('express');
const { expenseController } = require('../controllers');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const router = express.Router();

//  Create a new expense 
router.post('/', verifyToken, expenseController.create);

//  Get expenses 
router.get('/', verifyToken, expenseController.get);

//  Admin: Get all expenses
router.get('/all', verifyTokenAndAdmin, expenseController.getAll);

//  Admin: Get expenses by filters
router.get('/filter', verifyTokenAndAdmin, expenseController.getAllByQuery);

//  Admin: Update expense status
router.post('/:expenseId/status', verifyTokenAndAdmin, expenseController.updateStatus);

// Total Per Category
router.get('/total-per-category', verifyTokenAndAdmin, expenseController.totalExpenses);

// Over time
router.get('/over-time', verifyTokenAndAdmin, expenseController.expenseOverTime);

module.exports = router;
