const apiai = require('apiai');
const uuid = require('uuid');
const config = require('../config/index');

class ApiRecognizer{

  constructor(){
    this.app = apiai(config.nlp.api.token);
  }

  recognize(context, done){
    const {text} = context.message;
    const request = this.app.textRequest(text, {
      sessionId: uuid()
    });
    request.on('response', (response) => {
      const {result} = response;
      const speech = result.fulfillment.speech;
      done(null, {
          score: result.score,
          intent: result.action,
          params: result.parameters,
          response:speech
      });
    });

    request.on('error', done);
    request.end();
  }
}

module.exports = ApiRecognizer;