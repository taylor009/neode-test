'use strict';
const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const path       = require('path');
const logger     = require('./config/logger');
const Neode      = require('neode');
const neode = (new Neode('bolt://localhost:7687', 'neo4j', 'neo'))
    .withDirectory(__dirname+'/models');

const app = express();
neode.schema.install().then(() => console.info('Schema Installed'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use('/', (req, res, next) =>
// {
//     res.send('Hello World!');
//     next();
// });

app.use(require('./routes/skills')(neode));
module.exports = app;
