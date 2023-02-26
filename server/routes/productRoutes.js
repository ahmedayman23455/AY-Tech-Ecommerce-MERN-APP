const express = require('express');
const productController = require('../controllers/productController');
// const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
/* ------------------------------------------------------ */
const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
