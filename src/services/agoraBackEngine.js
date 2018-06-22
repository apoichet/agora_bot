const request = require('request-promise-native');
const config = require('../config/index');
const winston = require('../config/winston');

const agoraBackUrl = `http://${config.platforms.propositionengine.ip}:${config.platforms.propositionengine.port}/agoraback`;

/**
 * class service proposition engine
 */
class AgoraBackEngine {
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
    this._options.url = `${agoraBackUrl}/proposition/destinations`;
    return await callPropositionEngine(this._options);
  }

  /**
   * Renvoit les dates de départ du poll
   * @return {Promise<void>}
   */
  async getDepartures() {
    this._options.method = 'get';
    this._options.url = `${agoraBackUrl}/propositiondepartures`;
    return await callPropositionEngine(this._options);
  }

  /**
   * Renvoit les fourchettes de prix du poll
   * @return {Promise<void>}
   */
  async getPrices() {
    this._options.method = 'get';
    this._options.url = `${agoraBackUrl}/proposition/prices`;
    return await callPropositionEngine(this._options);
  }

  /**
   * Renvoit les propositions issues des choix des voyageurs
   * @param {travelerChoices} travelerChoices
   * @return {Promise<void>}
   */
  async buildProposals(travelerChoices) {
    this._options.method = 'post';
    this._options.url = `${agoraBackUrl}/proposition/build`;
    this._options.body = travelerChoices;
    return await callPropositionEngine(this._options);
  }

  /**
   * Renvoit les quotations issues des propositions
   * @param {propositions} propositions
   * @return {Promise<void>}
   */
  async buildQuotations(propositions) {
    this._options.method = 'post';
    this._options.url = `${agoraBackUrl}/quotation/build`;
    this._options.body = propositions;
    return await callPropositionEngine(this._options);
  }

  /**
   * Renvoit les quotations issues des propositions
   * @param {propositions} propositions
   * @return {Promise<void>}
   */
  async test() {
    this._options.method = 'post';
    this._options.url = `${agoraBackUrl}/test`;
    this._options.body = {test: "test"};
    return await callPropositionEngine(this._options);
  }
}

async function callPropositionEngine(options) {
  winston.info(`Appel proposition engine ${options.method} ${options.url}`);
  const response = await request(options);
  winston.info('Reponse proposition engine : '+response);
  return response;
}

module.exports = new AgoraBackEngine();