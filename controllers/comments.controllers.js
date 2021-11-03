const { fetchComments, insertComment, removeComment } = require('../models/comments.models')

exports.getComments = (req, res, next) => {
  fetchComments(req.params)
  .then((comments) => {
    res.status(200).send({ comments })
  })
  .catch(next)
}

exports.postComment = (req, res, next) => {
  insertComment(req.params, req.body)
  .then((comment) => {
    res.status(201).send({comment})
  })
  .catch(next)
}

exports.deleteComment = (req, res, next) => {
  removeComment()
  .then((comment) => {
    res.status(204).send({comment})
  })
}