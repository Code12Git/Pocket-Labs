const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

// Register
router.post('/register',authController.register)

// Login
router.post('/login',authController.login)

// Admin Login

router.post('/adminlogin',authController.adminlogin)


module.exports = router