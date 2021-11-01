const { fetchCategories, fetchReviews } = require("../models/games.models")

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
}