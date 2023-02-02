const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./factoryHandler');

/* ------------------ filterObj  ------------------ */
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

/* ------------------------ getMe ----------------------- */
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

/* --------------------- getAllUsers -------------------- */
exports.getAllUsers = factory.getAll(User);

/* ----------------------- getUser ---------------------- */
exports.getUser = factory.getOne(User);

/* ---------------------- updateMe ---------------------- */
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create an error if the user put the password in req.body
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `This route is not for passowrd updates. Please use (/updateMyPassword)`,
        400,
      ),
    );
  }

  // 2) filter the req.body . only allowed fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // 3) update the user with fields of req.body
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  // 4) send response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

/* ---------------------- deleteMe ---------------------- */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    active: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/* --------------------- for admins --------------------- */
// Don't update password with this / these for administrators not for user
/* if we try update password , the password toke will be removed and be string 
and when i try login with email and password (has string type) will  
send error ( Incorrect email or password) 
*/
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
