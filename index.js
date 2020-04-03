const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4300;

server.listen( PORT, (err) => {
    if (err) throw err;
    console.log(`Server is listening on ${PORT}`)
});