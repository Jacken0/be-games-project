const { fetchCategories, fetchReviews, updateReview, fetchAllReviews} = require("../models/reviews.models")

exports.getCategories = (req, res, next) => {
  fetchCategories()
  .then((categories) => {
    res.status(200).send({ categories })
  })
};

exports.getReviews = (req, res, next) => {
  fetchReviews(req.params)
  .then((review) => {
    res.status(200).send({ review })
  })
  .catch(next)
};

exports.patchReview = (req, res, next) => {
  updateReview(req.params, req.body)
  .then((review) => {
    res.status(200).send({ review })
  })
  .catch(next)
};

exports.getAllReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query
  fetchAllReviews(sort_by, order, category)
  .then((reviews) => {
    res.status(200).send({ reviews })
  })
  .catch(next)
};

