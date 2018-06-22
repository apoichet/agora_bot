const builder = require('botbuilder');
const telegramService = require('../../services/telegramService');
const winston = require('../../config/winston');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  // Confirme
  bot.dialog('confirmTravel', (session) => {
    builder.Prompts.choice(session, dialog.confirmTravel, dialog.confirmYes+'|'+dialog.confirmNo, {listStyle: builder.ListStyle.button});
  })
  .triggerAction({matches: ['inspiration', 'reservation']});

  // Start
  bot.dialog('startTravel',
      (session) => {
        winston.info('On démarre le voyage');
        session.conversationData.travelform = {};
        session.beginDialog('askDestination');
      }
  );

  // Manage
  bot.dialog('manageTravel', [async (session) => {
    // Recuperation du prompt
    const promptTravel = session.message.sourceEvent.callback_query;
    // Récupération du nombre de user dans la conversation
    session.conversationData.chatMembersCount = await telegramService.getChatMembersCount(session.message.address.conversation.id);

    if (promptTravel) {
      if (!session.conversationData.travelform.travelers) {
        session.conversationData.travelform.travelers = [];
      }

      let traveler;

      for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
        if (session.conversationData.travelform.travelers[iter]) {
          if (session.conversationData.travelform.travelers[iter].id === promptTravel.from.id) {
            traveler = session.conversationData.travelform.travelers[iter];
            break;
          }
        }
      }

      if (!traveler) {
        traveler = {id: promptTravel.from.id, firstName: promptTravel.from.first_name};
        session.conversationData.travelform.travelers.push(traveler);
      }

      // User choice
      session.send(traveler.firstName+' a choisi '+promptTravel.data);

      // --------------------- Choix Destination --------------------------------------------------------------
      winston.debug('Verrou destination : '+session.conversationData.travelform.destination);
      if (session.conversationData.travelform.destination && promptTravel.message.text === dialog.manageTravel.askDestination) {
        traveler.destination = promptTravel.data;
        winston.debug('Choix de la destination : '+traveler.destination);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].destination) {
            count++;
          }
        }
        winston.debug('Nombre de réponses : '+count);

        if (count === session.conversationData.chatMembersCount) {
          session.beginDialog('askDateDeparture');
        }
      }

      // --------------------- Choix Date --------------------------------------------------------------
      winston.debug('Verrou date : '+session.conversationData.travelform.date);
      if (session.conversationData.travelform.date && promptTravel.message.text === dialog.manageTravel.askDepartureDate) {
        traveler.date = promptTravel.data;
        winston.debug('Choix de la date : '+traveler.date);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].date) {
            count++;
          }
        }
        winston.debug('Nombre de réponses : '+count);

        if (count === session.conversationData.chatMembersCount) {
          session.beginDialog('askPrice');
        }
      }

      // --------------------- Choix Prix --------------------------------------------------------------
      winston.debug('Verrou prix : '+session.conversationData.travelform.price);
      if (session.conversationData.travelform.price && promptTravel.message.text === dialog.manageTravel.askPrice) {
        traveler.price = promptTravel.data;
        winston.debug('Choix du prix : '+traveler.price);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].price) {
            count++;
          }
        }
        winston.debug('Nombre de réponses : '+count);

        if (count === session.conversationData.chatMembersCount) {
          builder.Prompts.choice(session, dialog.confirmQuote, dialog.confirmYes+'|'+dialog.confirmNo, {listStyle: builder.ListStyle.button});
        }
      }

      winston.debug('Travelers', session.conversationData.travelform.travelers);
    }
  },
  ]);
};