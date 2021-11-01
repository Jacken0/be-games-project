exports.notARoute = (req, res) => {
  res.status(404).send({ message: 'Invalid URL' });
};

exports.handlesPSQLErrors = (err, req, res, next) => {
  console.log(err.code);
  if (err.code === "22P02") {
    res.status(400).send({ message: 'Invalid input data' });
  } else {
    next(err);
  }
};

exports.handlesCustomErrors = (err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ message: err.message });
    } else {
      next(err);
    }
  };
  
exports.handlesServerErrors = (err, req, res) => {
  console.log(err);
  res.sendStatus(500);
};