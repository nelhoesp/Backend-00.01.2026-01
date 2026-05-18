const express = require("express");

const router = express.Router();

const productsController = require("../controllers/product.controller");
console.log(productsController);

router.post("/", productsController.createProduct);
router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;