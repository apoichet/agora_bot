const me = require('./entries/me');
const greetings = require('./entries/greetings');
const insult = require('./insult');
const unknown = require('./unknown');
const agreement = require('./agreement');
const gratitude = require('./gratitude');
const joke = require('./joke');
const travel = require('./travel');
const confirmation = require('./confirmation');
const destination = require('./travel/destination');
const mistake = require('./mistake');

module.exports = {me,
  greetings,
  unknown,
  insult,
  gratitude,
  agreement,
  joke,
  travel,
  confirmation,
  destination,
  mistake};

