const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
/* ------------------------------------------------------ */
const router = express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;

// orderRoutes.route('/').post(protectRoute, createOrder);
// orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
// orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
// orderRoutes.route('/').get(protectRoute, admin, getOrders);
