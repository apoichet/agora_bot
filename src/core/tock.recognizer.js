const config = require('../config/index');
const request = require('request-promise-native');

/**
 * class Nlp Tock
 */
class TockRecognizer {
  /**
   * constructor
   */
  constructor() {
    this._options = {
      method: 'post',
      body: {
        'namespace': config.nlp.tock.namespace,
        'applicationName': config.nlp.tock.appName,
        'context': config.nlp.tock.context,
      },
      headers: config.nlp.tock.header,
      json: true,
      url: config.nlp.tock.url,
    };
  }

  /**
   * Nlp recognizer
   * @param {context} context
   * @param {done} done
   */
  recognize(context, done) {
    this._options.body.queries = [context.message.text.replace(config.talkbot, '').trim()];

    request(this._options)
    .then((response) => {
      done(null, {
        score: response.intentProbability,
        intent: response.intent,
        params: response.entities,
        userId: context.message.user.id,
        conversationId: context.message.address.conversation.id,
      });
    });
  }
}

module.exports = TockRecognizer;


