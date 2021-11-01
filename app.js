const express = require('express');
const { notARoute, handlesServerErrors, handlesPSQLErrors } = require('./controllers/errors.controllers');
const apiRouter = require('./routes/api-router');


const app = express();
app.use(express.json());

app.use('/api', apiRouter);
app.all('*', notARoute);

app.use(handlesPSQLErrors);
app.use(handlesServerErrors);

module.exports = app;