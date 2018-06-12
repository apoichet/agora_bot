const me = require('./entries/me');
const greetings = require('./entries/greetings');
const insult = require('./extras/insult');
const unknown = require('./extras/unknown');
const agreement = require('./extras/agreement');
const gratitude = require('./extras/gratitude');
const joke = require('./extras/joke');
const confirmation = require('./travel/confirmation');
const destination = require('./travel/destination');
const datetime = require('./travel/datetime');
const price = require('./travel/price');
const travelmanager = require('./travel/travelmanager');
const mistake = require('./extras/mistake');

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

