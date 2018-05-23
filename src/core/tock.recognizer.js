const config = require('../config/index');
const request = require('request-promise-native');

class TockRecognizer{

  constructor(){
    this.options = {
      method: 'post',
      body: {
        "namespace": config.nlp.tock.namespace,
        "applicationName": config.nlp.tock.appName,
        "context": config.nlp.tock.context
      },
      headers: config.nlp.tock.header,
      json: true,
      url: config.nlp.tock.url
    };
  }

  recognize(context, done){

    this.options.body.queries = [context.message.text.replace(config.talkbot, '').trim()];

    request(this.options)
    .then(response =>
    {
      done(null, {
        score: response.intentProbability,
        intent: response.intent,
        params: response.entities,
        userId: context.message.user.id,
        conversationId: context.message.address.conversation.id
      });
      
    });
    

  }
}

module.exports = TockRecognizer;


