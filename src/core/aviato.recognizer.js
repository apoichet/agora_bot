const config = require('../config/index');
const request = require('request-promise-native');

class AviatoRecognizer{

  constructor(){
    this._options = {
      method: 'post',
      body: {
      },
      headers: config.nlp.aviato.header,
      json: true,
      url: config.nlp.aviato.url
    };
  }

  async recognize(context, done){

    this._options.body.message = context.message.text.replace(config.talkbot, '').trim();

    request(this._options)
    .then(response =>
    {
      done(null, {
        score: response.intentProbability || 1,
        intent: response.intent,
        params: response.entities,
        userId: context.message.user.id,
        conversationId: context.message.address.conversation.id
      });
    })
  }
}

module.exports = AviatoRecognizer;
