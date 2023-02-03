const mongoose = require('mongoose');
const Product = require('./productModel');
/* ------------------------------------------------------ */

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review cann't be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [
      true,
      ' A review must belong to a user',
    ],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [
      true,
      'A review must belong to a product',
    ],
  },
});

/* ----- set indexes on some of fields in reviewModel ----- */
reviewSchema.index(
  { product: 1, user: 1 },
  { unique: true },
);
/* -------------------- static methods ------------------- */
reviewSchema.statics.calcAverageRating =
  async function (productId) {
    const stats = await this.aggregate([
      {
        $match: { product: productId },
      },
      {
        $group: {
          _id: '$product',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating,
      });
    } else {
      //  that means all the reviews removed well then we want to go back to the default.
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5,
      });
    }
    /* we should execute this code here whenever do have something in the stats array */
  };

/* ----------------- document middleware ---------------- */
reviewSchema.post('save', function () {
  // this > points to the current review document
  // this.tour > points to the tour id that exist inside review document
  this.constructor.calcAverageRating(
    this.product,
  );
});
/* ------------------ query middleware ------------------ */
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

//findByIdAndUpdate
//findByIdAndDelete
reviewSchema.pre(
  /^findOneAnd/,
  async function (next) {
    this.r = await this.findOne();

    next();
  },
);

reviewSchema.post(
  /^findOneAnd/,
  async function () {
    /* await this.findOne(); doesn't work here( maybe work update but wil not work ond delete) 
 consider it is not wor ks . query has already executed  */
    await this.r.constructor.calcAverageRating(
      this.r.product,
    );
  },
);

/* ------------------------------------------------------ */
const Review = mongoose.model(
  'Review',
  reviewSchema,
);

module.exports = Review;
