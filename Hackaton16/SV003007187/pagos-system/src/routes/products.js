const express = require('express');
const { getProducts, getProduct } = require('../controllers/productController');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();

router.get('/', ensureAuthenticated, getProducts);
router.get('/:id', ensureAuthenticated, getProduct);

module.exports = router;