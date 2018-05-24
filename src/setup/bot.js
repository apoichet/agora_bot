const builder = require('botbuilder');
const conversations = require('../conversations');
const config = require('../config/index');
const NlpFactory = require('../core/nlpfactory');

module.exports = (connector) => {
  const bot = new builder.UniversalBot(connector);
  bot.use({
    botbuilder: [(session, next) => {
      //Si on s'adresse au bot alors on fait appel au Nlp
      if (session.message.text.includes(config.talkbot)){
        session.sendTyping();
        next()
      }
    }]
  });

  let nlp = NlpFactory.create(NlpFactory.AVIATO);
  bot.recognizer(nlp);

  //Defaut
  bot.dialog('/', session => {
    session.send("Désolé je ne comprends pas")
  });

  //Assigne les conversations
  let assign = (object) => {
    for (let key in object){
      object[key](bot, connector)
    }
  };

  assign(conversations);

  return bot;
};