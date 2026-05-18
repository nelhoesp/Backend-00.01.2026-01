const db = require("../config/db");

const createProduct = async (name, description, price) => {
  const query = `
    INSERT INTO products (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [name, description, price];

  const result = await db.query(query, values);

  return result.rows[0];
};

const getProducts = async () => {
  const query = `
    SELECT * FROM products
    ORDER BY id ASC
  `;

  const result = await db.query(query);

  return result.rows;
};

const getProductById = async (id) => {
  const query = `
    SELECT * FROM products
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const deleteProduct = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
};