const { fetchEndpoints } = require("../models/endpoints.models")

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
  .then((endPoints) => {
    res.status(200).send(endPoints)
  })
  .catch(next)
}