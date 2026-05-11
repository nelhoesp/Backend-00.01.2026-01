const db = require('../config/database');
const Payment = require('./Payment');

class Refund {
    static async create(paymentId, userId, amount, reason) {
        const connection = await db.getConnection();
        
        try {
            await connection.beginTransaction();
            
            const payment = await Payment.getById(paymentId);
            if (!payment || payment.user_id !== userId) {
                throw new Error('Payment not found or unauthorized');
            }
            
            if (payment.status !== 'completed') {
                throw new Error('Only completed payments can be refunded');
            }
            
            const [result] = await connection.query(
                'INSERT INTO refunds (payment_id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
                [paymentId, userId, amount, reason]
            );
            
            await Payment.updateStatus(paymentId, 'refunded');
            
            await connection.query(
                'UPDATE products SET stock = stock + 1 WHERE id = ?',
                [payment.product_id]
            );
            
            await connection.commit();
            return result.insertId;
            
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getUserRefunds(userId) {
        const [rows] = await db.query(
            `SELECT r.*, p.amount as original_amount, pr.name as product_name 
             FROM refunds r 
             JOIN payments p ON r.payment_id = p.id 
             JOIN products pr ON p.product_id = pr.id 
             WHERE r.user_id = ? 
             ORDER BY r.refund_date DESC`,
            [userId]
        );
        return rows;
    }
}

module.exports = Refund;