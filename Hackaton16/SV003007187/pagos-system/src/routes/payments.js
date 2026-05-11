const express = require('express');
const { 
    processPayment, 
    getUserPayments, 
    requestRefund,
    getUserRefunds 
} = require('../controllers/paymentController');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();

router.post('/process', ensureAuthenticated, processPayment);
router.get('/history', ensureAuthenticated, getUserPayments);
router.post('/refund', ensureAuthenticated, requestRefund);
router.get('/refunds', ensureAuthenticated, getUserRefunds);

module.exports = router;