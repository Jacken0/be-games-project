const { fetchEndpoints } = require("../models/endpoints.models")

exports.getEndpoints = (req, res, next) => {
  res.status(200).send(fetchEndpoints())
  // .then((endPoints) => {
  //   //console.log(endPoints,'CONT')
  //   res.status(200).send(endPoints)
  // })
  // .catch(next)
}