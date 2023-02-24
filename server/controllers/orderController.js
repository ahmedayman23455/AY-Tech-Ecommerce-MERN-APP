// const factory = require('./factoryHandler');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');
const AppError = require('../utils/appError');
/* ------------------------------------------------------ */
/* --------------------- createOrder -------------------- */
exports.createOrder = catchAsync(
  async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      paymentDetails,
      userInfo,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items.');
    } else {
      const order = new Order({
        orderItems,
        user: userInfo._id,
        username: userInfo.name,
        email: userInfo.email,
        shippingAddress,
        paymentMethod,
        paymentDetails,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  },
);

/* ---------------------- getOrders --------------------- */
exports.getAllOrders = factory.getAll(Order);

/* ---------------------- getOrder ---------------------- */
exports.getOrder = factory.getOne(Order);

/* --------------------- updateOrder -------------------- */
exports.updateOrder = factory.updateOne(Order);
/* --------------------- deleteOrder -------------------- */
exports.deleteOrder = factory.deleteOne(Order);
/* -------------------- setDelivered -------------------- */
exports.setDelivered = catchAsync(
  async (req, res, next) => {
    const order = await Order.findById(
      req.params.id,
    );

    if (!order) {
      return next(
        new AppError(
          'Order could not be updated.',
          400,
        ),
      );
    }

    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.status(200).json({
      status: 'success',
      data: updatedOrder,
    });
  },
);
