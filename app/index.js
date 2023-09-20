const express = require('express');
const morgan = require('morgan');
const app = express();
const tour = require('../routes/tour');
const user = require('../routes/user');

app.use((req, res, next) => {
    const time = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    req.requestTime = time;
    next();
});

morgan.token('request-time', (req) => {
    return req.requestTime;
});

app.use(
    morgan(
        'method: :method - endpoint: :url - status: :status - content-length: :res[content-length] - response-time: :response-time ms - Request Time: :request-time',
    ),
);

app.use(express.json());

app.use('/api/v1/tours', tour);
app.use('/api/v1/users', user);

module.exports = app;
