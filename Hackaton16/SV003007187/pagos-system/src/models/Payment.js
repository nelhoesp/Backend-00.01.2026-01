const db = require('../config/database');

class Payment {
    static async create(userId, productId, amount) {
        const [result] = await db.query(
            'INSERT INTO payments (user_id, product_id, amount, status) VALUES (?, ?, ?, "pending")',
            [userId, productId, amount]
        );
        return result.insertId;
    }

    static async updateStatus(paymentId, status) {
        await db.query('UPDATE payments SET status = ? WHERE id = ?', [status, paymentId]);
    }

    static async getUserPayments(userId) {
        const [rows] = await db.query(
            `SELECT p.*, pr.name as product_name, pr.price 
             FROM payments p 
             JOIN products pr ON p.product_id = pr.id 
             WHERE p.user_id = ? 
             ORDER BY p.payment_date DESC`,
            [userId]
        );
        return rows;
    }

    static async getById(paymentId) {
        const [rows] = await db.query(
            `SELECT p.*, pr.name as product_name, u.name as user_name 
             FROM payments p 
             JOIN products pr ON p.product_id = pr.id 
             JOIN users u ON p.user_id = u.id 
             WHERE p.id = ?`,
            [paymentId]
        );
        return rows[0];
    }
}

module.exports = Payment;