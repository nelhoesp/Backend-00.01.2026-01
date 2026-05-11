const Payment = require('../models/Payment');
const Product = require('../models/Product');
const Refund = require('../models/Refund');

async function processPayment(req, res) {
    try {
        const { productId } = req.body;
        const userId = req.user.id;
        
        const product = await Product.getById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (product.stock <= 0) {
            return res.status(400).json({ error: 'Product out of stock' });
        }
        
        const paymentId = await Payment.create(userId, productId, product.price);
        await Product.updateStock(productId, 1);
        await Payment.updateStatus(paymentId, 'completed');
        
        const payment = await Payment.getById(paymentId);
        
        req.app.get('io').emit('payment_processed', {
            userId,
            payment,
            timestamp: new Date()
        });
        
        res.json({ success: true, payment });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserPayments(req, res) {
    try {
        const payments = await Payment.getUserPayments(req.user.id);
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function requestRefund(req, res) {
    try {
        const { paymentId, reason } = req.body;
        const userId = req.user.id;
        
        const payment = await Payment.getById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        
        if (payment.user_id !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        const refundId = await Refund.create(paymentId, userId, payment.amount, reason);
        
        req.app.get('io').emit('refund_processed', {
            userId,
            paymentId,
            refundId,
            timestamp: new Date()
        });
        
        res.json({ success: true, refundId });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserRefunds(req, res) {
    try {
        const refunds = await Refund.getUserRefunds(req.user.id);
        res.json(refunds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    processPayment,
    getUserPayments,
    requestRefund,
    getUserRefunds
};