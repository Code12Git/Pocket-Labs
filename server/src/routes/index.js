const express = require('express');

const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes')
const router = express.Router();

router.use('/auth',authRoutes)
router.use('/expense',expenseRoutes)

module.exports = router;