/* eslint-disable guard-for-in */
const builder = require('botbuilder');
const conversations = require('../conversations');
const config = require('../config/index');
const dialog = require('../config/dialog');
const NlpFactory = require('../core/nlpfactory');
const telegramService = require('../services/telegramService');
const winston = require('../config/winston');
const travelers = require('../conversations/travel/testtraveleres');
const app = require('../server/app');

const request = require('request-promise-native');

module.exports = (connector) => {
  const bot = new builder.UniversalBot(connector);
  let nlp = NlpFactory.create(NlpFactory.AVIATO);

  // Entry point
  bot.use({
    botbuilder: (session, next) => {

      // Cancel conversation
      if (session.message.text.match(/^annulation$/i)) {
        winston.info('Annulation de la réservation');
        session.endConversation('Ok on annule et on stoppe la conversation');
      }

      // Session de paiement
      if (session.conversationData.refPayment){
        session.conversationData.refPayment = session.message.text;
        session.beginDialog('refPayment');
      }
      if (session.message.text === 'obtainPayement' && session.conversationData.quotations) {
        session.beginDialog('confirmPayment');
      }

      // Confirmation Non
      if (session.message.text === dialog.confirmNo) {
        session.beginDialog('confirmationNo');
      }
      // Confirmation Oui
      if (session.message.text === dialog.confirmYes) {
        session.beginDialog('confirmationYes');
      }
      // Session travel
      if (session.conversationData.travelform && !(session.message.text === dialog.confirmYes || session.message.text === dialog.confirmNo)) {
        session.beginDialog('manageTravel');
      }
      // Call NLP
      if (session.message.text.includes(config.talkbot)) {
        next();
        session.sendTyping();
      }

      // Test
      if (session.message.text === 'test') {
        session.conversationData.travelers = travelers;
        session.beginDialog('quote');
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
    winston.error('error '+session);
    if (session && typeof session.beginDialog === 'function') {
      session.beginDialog('mistake');
    }
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