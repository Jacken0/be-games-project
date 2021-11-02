const { getReviews, postReview, patchReview, getAllReviews } = require('../controllers/games.controllers');

const reviewsRouter = require('express').Router();

reviewsRouter.route('/:review_id').get(getReviews).patch(patchReview);
reviewsRouter.route('/').get(getAllReviews)


module.exports = reviewsRouter;