const { getComments, postComment } = require('../controllers/comments.controllers');
const { getReviews, patchReview, getAllReviews } = require('../controllers/reviews.controllers');

const reviewsRouter = require('express').Router();

reviewsRouter
  .route('/:review_id')
  .get(getReviews)
  .patch(patchReview);

reviewsRouter
  .route('/')
  .get(getAllReviews);

reviewsRouter
  .route('/:review_id/comments')
  .get(getComments)
  .post(postComment);

module.exports = reviewsRouter;