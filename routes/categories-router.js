const categoriesRouter = require('express').Router();
const { getCategories } = require('../controllers/reviews.controllers');

categoriesRouter
  .route('/')
  .get(getCategories);

module.exports = categoriesRouter;