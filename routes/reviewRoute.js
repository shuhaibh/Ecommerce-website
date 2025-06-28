const express = require('express')
const reviewRouter = express.Router()

const { getReviews } = require('../controllers/reviewController');
const { addReview } = require('../controllers/reviewController');
const { deleteReview } = require('../controllers/reviewController');



reviewRouter.get('/:productId', getReviews)

reviewRouter.post('/:productId', addReview)

reviewRouter.delete('/:reviewId', deleteReview)


module.exports = reviewRouter