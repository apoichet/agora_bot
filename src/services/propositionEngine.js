const request = require('request-promise-native');
const config = require('../config/index');
const winston = require('../config/winston');

/**
 * class service proposition engine
 */
class PropositionEngine {
  /**
   * constructor
   */
   constructor() {
     this._options = {
       json: true,
     };
   }

  /**
   * Renvoit les detinations du poll
   * @return {Promise<void>}
   */
  async getDestinations() {
    this._options.method = 'get';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/destinations`;
    winston.info(`Appel proposition engine ${this._options.method} ${this._options.url}`);
    const response = await request(this._options);
    winston.info('Reponse proposition engine', response);
    return response;
  }

  /**
   * Renvoit les dates de départ du poll
   * @return {Promise<void>}
   */
  async getDepartures() {
    this._options.method = 'get';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/departures`;
    winston.info(`Appel proposition engine ${this._options.method} ${this._options.url}`);
    const response = await request(this._options);
    winston.info('Reponse proposition engine', response);
    return response;
  }

  /**
   * Renvoit les fourchettes de prix du poll
   * @return {Promise<void>}
   */
  async getPrices() {
    this._options.method = 'get';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/prices`;
    winston.info(`Appel proposition engine ${this._options.method} ${this._options.url}`);
    const response = await request(this._options);
    winston.info('Reponse proposition engine', response);
    return response;
  }

  /**
   * Renvoit les propositions issues des choix des voyageurs
   * @param {travelerChoices} travelerChoices
   * @return {Promise<void>}
   */
  async buildPropositions(travelerChoices) {
    this._options.method = 'post';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/build`;
    this._options.body = travelerChoices;
    winston.info(`Appel proposition engine ${this._options.method} ${this._options.url}`);
    const response = await request(this._options);
    winston.info('Reponse proposition engine', response);
    return response;
  }
}

module.exports = new PropositionEngine();