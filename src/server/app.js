'use strict';
const express = require('express');
const path = require('path');
const app = express();

// Fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public')));

// Gestion des erreurs
process.on('uncaughtException', function(err) {
  console.error('An uncaughtException was found, the program will end. ' + err + ', stacktrace: ' + err.stack);
  return process.exit(1);
});

module.exports = app;

