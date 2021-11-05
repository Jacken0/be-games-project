const { deleteComment, getAllComments } = require('../controllers/comments.controllers');
const commentsRouter = require('express').Router();

commentsRouter
  .route('/:comment_id')
  .delete(deleteComment);

commentsRouter
  .route('/')
  .get(getAllComments);

module.exports = commentsRouter;