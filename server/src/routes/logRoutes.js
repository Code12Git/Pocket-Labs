const express = require('express');
const { logController } = require('../controllers');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const router = express.Router();

router.get('/',verifyTokenAndAdmin,logController.getAll)


module.exports = router