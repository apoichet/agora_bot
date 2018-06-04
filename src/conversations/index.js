const me = require('./entries/me');
const greetings = require('./entries/greetings');
const insult = require('./insult');
const unknown = require('./unknown');
const agreement = require('./agreement');
const gratitude = require('./gratitude');
const joke = require('./joke');
const confirmation = require('./confirmation');
const destination = require('./travel/destination');
const datetime = require('./travel/datetime');
const price = require('./travel/price');
const travelmanager = require('./travel/travelmanager');
const mistake = require('./mistake');

module.exports = {me,
  greetings,
  unknown,
  insult,
  gratitude,
  agreement,
  joke,
  travelmanager,
  confirmation,
  destination,
  datetime,
  price,
  mistake};

