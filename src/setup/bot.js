/* eslint-disable guard-for-in */
const builder = require('botbuilder');
const conversations = require('../conversations');
const config = require('../config/index');
const NlpFactory = require('../core/nlpfactory');
const telegramService = require('../services/telegramService');
const winston = require('../config/winston');

module.exports = (connector) => {
  const bot = new builder.UniversalBot(connector);
  let nlp = NlpFactory.create(NlpFactory.AVIATO);

  // Entry point
  bot.use({
    botbuilder: (session, next) => {
      // Call NLP
      if (session.message.text.includes(config.talkbot)) {
        next();
        session.sendTyping();
      }

      if (session.message.text === 'Oui') {
        session.beginDialog('confirmationYes');
      }

      if (session.message.text === 'Non') {
        session.beginDialog('confirmationNo');
      }

      // Cancel conversation
      if (session.message.text.match(/^annulation$/i)) {
        winston.info('Annulation de la réservation');
        session.endConversation('Ok on annule et on stoppe la conversation');
      }

      // Session travel
      if (session.conversationData.travelform && !(session.message.text === 'Oui' || session.message.text === 'Non')) {
        session.beginDialog('manageTravel');
      }
    }});

  // Recognize with NLP
  bot.recognizer(nlp);

  // Coversation Update
  bot.on('conversationUpdate', (session) => {
    session.conversationData.chatMembersCount = telegramService.getChatMembersCount(session.message.address.conversation.id);
  });

  // Unknown intent
  bot.dialog('/', (session, args) => {
    winston.info('Intention inconnue : ', args);
    session.beginDialog('unknown');
  });

  // Error occured
  bot.on('error', (session) => {
    winston.error('error', session);
    if (session) {
      session.beginDialog('mistake');
    };
  });

  // Assigne les conversations
  let assign = (object) => {
    for (let key in object) {
      object[key](bot, connector);
    }
  };

  assign(conversations);

  return bot;
};