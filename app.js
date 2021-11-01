const express = require('express');
const { notARoute } = require('./controllers/errors.controllers');
const apiRouter = require('./routes/api-router');


const app = express();
app.use(express.json());

app.use('/api', apiRouter);
app.all('*', notARoute);

module.exports = app;