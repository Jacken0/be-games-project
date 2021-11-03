const { getComments } = require('../controllers/comments.controllers');
const { getReviews, patchReview, getAllReviews } = require('../controllers/games.controllers');
//const commentsRouter = require('./comments-router');

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
  .get(getComments);

module.exports = reviewsRouter;