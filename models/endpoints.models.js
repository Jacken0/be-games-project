const fs = require('fs/promises');

exports.fetchEndpoints = () => {
  return fs.readFile('../routes/endpoints.json','utf-8', (err, data))
  .then((data) => {
    console.log(data)
    return response
  })
}