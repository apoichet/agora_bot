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
      if (session.message.text.includes(config.talkbot)){
        next();
      }

      if (!session.conversationData.journey && session.message.text === 'Oui'){
        console.log(session);
        session.beginDialog('startTravel');
      }
      
      //Cancel conversation
      if (session.message.text.match(/^annulation$/i) || (!session.conversationData.journey && session.message.text === 'Non')){
        console.log('Annulation de la réservation');
        session.endConversation('Ok on annule et on stoppe la conversation');
      }

      //Complete journey
      if (session.conversationData.journey){
        session.beginDialog('completeTravel');
      }

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