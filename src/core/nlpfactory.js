const ApiRecognizer = require('../core/api.recognizer');
const TockRecognizer = require('../core/tock.recognizer');

class NlpFactory {

  constructor(){
    this.TOCK = 'TOCK';
    this.API = 'API';
  }
  
  create(name) {

    switch (name){
      case this.API:return new ApiRecognizer();
      case this.TOCK: return new TockRecognizer();
    }

    throw new Error("There is no NLP !");

  };
}

module.exports = new NlpFactory();