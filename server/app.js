const express = require('express');

const path = require('path');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
/* ------------------------------------------------------ */

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Put Body of request  > req.body
app.use(express.json({ limit: '10kb' }));

//  Rotues
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);

//  Handling Unhandled Routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't Find ${req.originalUrl} On This Server!`,
      404,
    ),
  );
});

// Global Error Handler
app.use(globalErrorHandler);
module.exports = app;
