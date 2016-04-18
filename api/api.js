const express = require('express');
const bodyParser = require('body-parser');
const api = express();

api.use(bodyParser.json());

require('./sample/routes')(api);

module.exports = api;
