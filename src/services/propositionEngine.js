const request = require('request-promise-native');
const config = require('../config/index');

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
    const response = await request(this._options);
    console.log(response);
    return response;
  }

  /**
   * Renvoit les dates de départ du poll
   * @return {Promise<void>}
   */
  async getDepartures() {
    this._options.method = 'get';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/departures`;
    const response = await request(this._options);
    return response;
  }

  /**
   * Renvoit les fourchettes de prix du poll
   * @return {Promise<void>}
   */
  async getPrices() {
    this._options.method = 'get';
    this._options.url = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agora/proposition/prices`;
    const response = await request(this._options);
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
    const response = await request(this._options);
    return response;
  }
}

module.exports = new PropositionEngine();