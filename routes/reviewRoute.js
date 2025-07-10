const express = require('express')
const reviewRouter = express.Router()

const { getReviews } = require('../controllers/reviewController');
const { addReview } = require('../controllers/reviewController');
const { deleteReview } = require('../controllers/reviewController');

const authUser = require('../middlewares/authUser')

reviewRouter.get('/:productId', authUser, getReviews)

reviewRouter.post('/:productId', authUser, addReview)

reviewRouter.delete('/:reviewId', authUser, deleteReview)


module.exports = reviewRouter