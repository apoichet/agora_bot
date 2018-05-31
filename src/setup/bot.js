const builder = require('botbuilder');
const conversations = require('../conversations');
const config = require('../config/index');
const NlpFactory = require('../core/nlpfactory');

module.exports = (connector) => {
  const bot = new builder.UniversalBot(connector);
  let nlp = NlpFactory.create(NlpFactory.AVIATO);

  //Entry point
  bot.use({
    botbuilder: (session, next) => {

      //Call NLP
      if (session.message.text.includes(config.talkbot)
          || session.message.text === 'Oui'
          || session.message.text === 'Non'){

        next();
      }
      
      //Cancel conversation
      if (session.message.text.match(/^annulation$/i)){
        console.log('Annulation de la réservation');
        session.endConversation('Ok on annule et on stoppe la conversation');
      }

     /* //Session journey
      if (session.conversationData.journey){
        session.beginDialog('completeJourney');
      }*/

    }});

  bot.recognizer(nlp);

  //Unknown intent
  bot.dialog('/', (session, args, next) => {
    console.log('Intention inconnue : ', args);
    session.beginDialog('unknown');
  });

  //Error occured
  bot.on('error', (session) => {
    console.log('error',session);
    session.beginDialog('mistake');
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