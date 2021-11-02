const { fetchCategories, fetchReviews, addReview, updateReview, fetchAllReviews } = require("../models/games.models")

exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send({ categories })
    })
}

exports.getReviews = (req, res, next) => {
    fetchReviews(req.params)
    .then((review) => {
        res.status(200).send({ review })
    })
    .catch(next)
}

exports.patchReview = (req, res, next) => {
    updateReview(req.params, req.body)
    .then((review) => {
        res.status(201).send({ review })
    })
    .catch(next)
}

exports.getAllReviews = (req, res, next) => {
    const { sort_by } = req.query;
    fetchAllReviews(sort_by)
    .then((reviews) => {
        res.status(200).send({ reviews })
    })
    .catch(next)
}

// exports.postReview = (req, res, next) => {
//     addReview(req.body)
//     .then(() => {
//         res.status(201).send({});
//     })
//     .catch(next)
// }