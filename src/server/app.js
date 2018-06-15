'use strict';
const express = require('express');
const path = require('path');
const app = express();
const winston = require('../config/winston');
const morgan = require('morgan');

// Logger
app.use(morgan('combined', {stream: winston.stream}));

// Fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));

// Gestion des erreurs
process.on('uncaughtException', function(err) {
  winston.error('An uncaughtException was found, the program will end. ' + err + ', stacktrace: ' + err.stack);
  return process.exit(1);
});

module.exports = app;

