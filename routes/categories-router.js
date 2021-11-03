const categoriesRouter = require('express').Router();

const { getCategories } = require('../controllers/games.controllers');

categoriesRouter
  .route('/')
  .get(getCategories);



module.exports = categoriesRouter;