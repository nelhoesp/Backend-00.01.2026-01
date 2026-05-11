const db = require('../config/database');

class Product {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM products WHERE stock > 0');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateStock(id, quantity) {
        await db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, id]);
    }
}

module.exports = Product;