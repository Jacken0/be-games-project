const { getReviews } = require('../controllers/games.controllers');

const reviewsRouter = require('express').Router();

reviewsRouter.route('/:review_id').get(getReviews);


module.exports = reviewsRouter;