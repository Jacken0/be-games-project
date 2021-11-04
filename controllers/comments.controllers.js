const { fetchComments, insertComment, removeComment, fetchAllComments } = require('../models/comments.models')

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
  removeComment(req.params)
  .then((comment) => {
    res.status(204).send()
  })
  .catch(next)
}

exports.getAllComments = (req, res, next) => {
  fetchAllComments()
  .then((comments) => {
    res.status(200).send({comments})
  })
  .catch(next)
}