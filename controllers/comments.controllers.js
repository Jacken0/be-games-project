const { fetchComments } = require('../models/comments.models')

exports.getComments =(req, res, next) => {
  fetchComments(req.params)
  .then((comments) => {
    res.status(200).send({ comments })
  })
}