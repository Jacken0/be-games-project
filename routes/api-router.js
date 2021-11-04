const apiRouter = require('express').Router();
const { getEndpoints } = require('../controllers/endpoints.controllers');
const categoriesRouter = require('./categories-router');
const commentsRouter = require('./comments-router');
const reviewsRouter = require('./reviews-router');

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter
  .route('/')
  .get(getEndpoints);

module.exports = apiRouter;