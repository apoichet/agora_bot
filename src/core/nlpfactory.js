const ApiRecognizer = require('../core/api.recognizer');
const TockRecognizer = require('../core/tock.recognizer');
const AviatoRecognizer = require('../core/aviato.recognizer');

class NlpFactory {

  constructor(){
    this.TOCK = 'TOCK';
    this.API = 'API';
    this.AVIATO = 'AVIATO';
  }
  
  create(name) {

    switch (name){
      case this.API:return new ApiRecognizer();
      case this.TOCK: return new TockRecognizer();
      case this.AVIATO: return new AviatoRecognizer();
    }

    throw new Error("There is no NLP !");

  };
}

module.exports = new NlpFactory();