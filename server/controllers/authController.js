const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

/* ----------------- signToken function ----------------- */
const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
/* ------------------- createSentToken ------------------ */
const createSentToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user,
    },
  });
};

/* ----------------------- signup ----------------------- */
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangetAt: req.body.passwordChangetAt,
    role: req.body.role,
  });

  createSentToken(newUser, 201, res);
});

/* ------------------------ login ----------------------- */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError(
        'Please provide email and password !!',
        400,
      ),
    );
  }

  const user = await User.findOne({ email }).select(
    '+password',
  );

  if (
    !user ||
    !(await user.correctPassword(password, user.password))
  ) {
    return next(
      new AppError('Incorrect email or password'),
      401,
    );
  }

  createSentToken(user, 200, res);
});

/* ----------------------- protect ---------------------- */
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get A Token and check if there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(
      new AppError(
        'Your are not logged in! Please log in to get access',
        401,
      ),
    );
  }

  // 2) Verification token ( someone manipulate the data  OR the token expired)
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // 3) check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist !',
        401,
      ),
    );
  }

  // 4) Check if the user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'user recently changed password! pleasae log in again !',
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
});

/* --------------------- restrictTo --------------------- */
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `you don't have permission to perform this action.`,
        ),
        403,
      );
    }
    next();
  };

/* ------------------- forgotPassword ------------------- */
exports.forgotPassword = catchAsync(
  async (req, res, next) => {
    // 1) Get User Based On Posted Email
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        new AppError(
          'There is no user with email address.',
          404,
        ),
      );
    }

    // 2) Generate the random Reset Token
    const passwordResetToken =
      user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      // 3) send it to user's email
      const resetURL = `${req.protocol}://${req.get(
        'host',
      )}/api/v1/users/resetPassword/${passwordResetToken}`;

      await new Email(user, resetURL).sendPasswordReset();

      await res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was an error sending this email, Try again later !!!',
          500,
        ),
      );
    }
  },
);
/* -------------------- resetPassword ------------------- */
exports.resetPassword = catchAsync(
  async (req, res, next) => {
    // 1) Get the user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    /* note: Behind the scense mongodb will then convert everthing to the same 
  and therefore be able to compare them accurately */

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) if token has not expired , and there is user , set a new password
    if (!user) {
      return next(
        new AppError(
          'Token is invalid or has expired',
          400,
        ),
      );
    }

    // 3) If so, update password
    /*  (passwordChangedAt) property will update from pre middleware 
  when we make save  for the user */

    user.password = req.body.password;
    user.passwordConfirm = req.body.confirmPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    /* in this case we don't need turn off validators because we want to validate for exmaple 
    if password === passwordConfirm
  */
    await user.save();

    // 4) Log the user in, Send JWT to the client
    createSentToken(user, 200, res);
  },
);

/* ------------------- updatePassword ------------------- */
exports.updatePassword = catchAsync(
  async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user._id).select(
      '+password',
    );

    // 2) Check if the current password is correct
    if (
      !(await user.correctPassword(
        req.body.passwordCurrent,
        user.password,
      ))
    ) {
      return next(
        new AppError('Your current password is wrong', 401),
      );
    }
    // 3) if so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) log user in with new password and send new JWT
    createSentToken(user, 200, res);
  },
);
