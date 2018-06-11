const request = require('request-promise-native');
const config = require('../config/index');

class PropositionEngine{

   constructor(){
     this._options = {
       json: true,
     };
   }

  async getDestinations() {
    this._options.method = 'get';
    this._options.url = 'http://192.168.75.129:8080/agora/proposition/destinations';
    const response = await request(this._options);
    console.log(response);
    return response;
  }

  async getDepartures() {
    this._options.method = 'get';
    this._options.url = 'http://192.168.75.129:8080/agora/proposition/departures';
    const response = await request(this._options);
    return response;
  }

  async getPrices() {
    this._options.method = 'get';
    this._options.url = 'http://192.168.75.129:8080/agora/proposition/prices';
    const response = await request(this._options);
    return response;
  }

  async buildPropositions(travelerChoices) {
    this._options.method = 'post';
    this._options.url = 'http://192.168.75.129:8080/agora/proposition/build';
    this._options.body = travelerChoices;
    const response = await request(this._options);
    return response;
  }
}

module.exports = new PropositionEngine();