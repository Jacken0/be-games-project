const { fetchEndpoints } = require("../models/endpoints.models")

exports.getEndpoints = (req, res, next) => {
  res.status(200).send(fetchEndpoints())
}