const express = require('express');
const { expenseController } = require('../controllers');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

// Create

router.post('/',verifyToken,expenseController.create)

router.get('/',verifyToken,expenseController.get)


module.exports = router