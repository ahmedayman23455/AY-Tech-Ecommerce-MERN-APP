const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

/* ---------------------- deleteOne --------------------- */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(
      req.params.id,
    );

    if (!doc) {
      return next(
        new AppError(
          'No document found with that id.',
          404,
        ),
      );
    }

    res.status(204).json({ status: 'success', data: null });
  });

/* ---------------------- updateOne --------------------- */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doc) {
      return next(
        new AppError(
          'No document found with that id.',
          404,
        ),
      );
    }

    res
      .status(200)
      .json({ status: 'success', data: { data: doc } });
  });

/* ---------------------- createOne --------------------- */
exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res
      .status(201)
      .json({ status: 'success', data: { data: doc } });
  });

/* ----------------------- getOne ----------------------- */
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(
        new AppError(
          'No document found with that id.',
          404,
        ),
      );
    }
    res
      .status(200)
      .json({ message: 'success', data: { data: doc } });
  });

/* ----------------------- getAll ----------------------- */
exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    //  To Allow For Nested Get Reviews On product  (Hack)
    let filter = {};
    if (req.params.proudctId) {
      filter = { product: req.params.proudctId };
    }
    /* ------------------------------------------------------ */

    const features = new APIFeatures(
      Model.find(filter),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute query
    // const doc = await features.query.explain();
    const doc = await features.query;

    return res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { data: doc },
    });
  });
