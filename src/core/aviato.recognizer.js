const config = require('../config/index');
const request = require('request-promise-native');
const winston = require('../config/winston');

/**
 * Class NLP Aviato
 */
class AviatoRecognizer {
  /**
   * constructor
   */
  constructor() {
    this._options = {
      method: 'post',
      body: {
      },
      headers: config.nlp.aviato.header,
      json: true,
      url: config.nlp.aviato.url,
    };
  }

  /**
   * NLP recognizer
   * @param {context} context
   * @param {done} done
   */
  async recognize(context, done) {
    this._options.body.message = context.message.text.replace(config.talkbot, '').trim();
    winston.info('appel nlp : '+this._options.body.message);

    try {
      const response = await request(this._options);
      if (response) {
        winston.info('reponse intention nlp : '+response.intent);
        done(null, {
          score: response.intentProbability || 1,
          intent: response.intent || 'unknown',
          params: response.entities,
          userId: context.message.user.id,
          conversationId: context.message.address.conversation.id,
        });
      }
    } catch (err) {
      winston.error(err);
    }
  }
}

module.exports = AviatoRecognizer;
