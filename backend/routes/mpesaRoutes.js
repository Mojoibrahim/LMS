const express = require('express');
const router = express.Router();
const { generateToken } = require('../middlewares/mpesaAuth');
const { stkPush, stkCallback } = require('../controllers/mpesaController');

router.post('/stkpush', generateToken, stkPush);
router.post('/callback', stkCallback);

module.exports = router;