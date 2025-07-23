const express = require('express');

const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes')
const logsRoutes = require('./logRoutes')
const router = express.Router();

router.use('/auth',authRoutes)
router.use('/expense',expenseRoutes)
router.use('/logs',logsRoutes)

module.exports = router;