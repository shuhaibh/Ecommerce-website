const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product_id: productId }).populate('user_id', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const existing = await Review.findOne({
      user_id: req.user._id,
      product_id: productId
    });

    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await Review.create({
      product_id: productId,
      user_id: req.user.id,
      rating,
      comment
    });

    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  getReviews,
  addReview,
  deleteReview
};
