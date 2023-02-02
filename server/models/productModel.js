const mongoose = require('mongoose');
/* ------------------------------------------------------ */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
    },
    image: {
      type: String,
      required: [true, ' A product must have an image'],
    },
    description: {
      type: String,
      required: [true, ' A product must have an description'],
    },
    brand: {
      type: String,
      required: [true, ' A product must have an brand'],
    },
    category: {
      type: String,
      required: [true, ' A product must have an category'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    //  reviews ( virtual property)
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'zzz',
  localField: '',
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
