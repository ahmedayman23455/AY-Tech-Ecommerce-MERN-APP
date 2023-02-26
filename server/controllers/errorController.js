const AppError = require('../utils/appError');

/* ------------------ handleCastErrorDB ----------------- */
/* handleCaseErrorDB > transofrm the weird error 1 that we geeting from mongoose 
into an operational error with a nice friendly message that an actual human can read.*/
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

/* --------------- handleDuplicateFieldsDB -------------- */
const handleDuplicateFieldsDB = (err) => {
  const DuplicateFields = Object.values(
    err.keyValue,
  ).map((value) => `(${value})`);

  const message = `Duplicate field values: ${DuplicateFields.join(
    ' ',
  )}. please use another value(s) `;

  return new AppError(message, 400);
};

/* -------------- handleVadlidationErrorDB -------------- */
const handleVadlidationErrorDB = (err) => {
  const errorsMessages = Object.values(
    err.errors,
  ).map((error) => error.message);
  const message = `Invalid input data. ${errorsMessages.join(
    '. ',
  )}`;
  return new AppError(message, 400);
};

/* ------------------- handleJWTError ------------------- */
const handleJWTError = () =>
  new AppError(
    'Invalid token. Please log in again!',
    401,
  );

/* ---------------- handleJWTExpiredError --------------- */
const handleJWTExpiredError = () =>
  new AppError(
    'Your token has expired! Please log in again.',
    401,
  );

/* -------------------- sendErrorDev -------------------- */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

/* -------------------- sendErrorPro -------------------- */
const sendErrorPro = (err, res) => {
  // Operatioanl, trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programming or other unknown error : don't leak error details
  else {
    // 1) log error to developers see error
    console.error('Error 🛑', err);
    // 2) Send Generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong !',
    });
  }
};

/* ----------------- globalErrorHandlers ---------------- */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err);
  console.log(err.code);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (
    process.env.NODE_ENV === 'production'
  ) {
    let error = { ...err };
    // const errorName = err.name;
    // const errorCode = err.code;

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (err.code === 11000) {
      console.log('test 😡😡');
      error = handleDuplicateFieldsDB(error);
    }

    if (err.name === 'ValidationError') {
      error = handleVadlidationErrorDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorPro(error, res);
  }
};
