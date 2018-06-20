const winston = require('../../config/winston');

module.exports = (bot) => {
  bot.dialog('confirmationYes', async (session) => {
    const promptConfirm = session.message.sourceEvent.callback_query;
    winston.debug('Réponse positive du prompt de confirmation');
    if (promptConfirm) {
      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?' && !session.conversationData.travelform) {
        session.beginDialog('startTravel');
      }

      if (promptConfirm.message.text === 'Merci pour vos choix, c\'est bon pour tout le monde ?' && session.conversationData.travelform) {
        // On stock le choix des utilisateurs
        session.conversationData.travelers = session.conversationData.travelform.travelers;
        // On vide le formulaire
        session.conversationData.travelform = undefined;
        session.beginDialog('proposition');
      }

      if (promptConfirm.message.text === 'On fait une réservation ?') {
        session.conversationData.travelers = undefined;
        session.beginDialog('reservation');
      }
    }
  }).triggerAction({matches: 'yes'});

  bot.dialog('confirmationNo', (session) => {
    const promptConfirm = session.message.sourceEvent.callback_query;
    winston.debug('Réponse négative du prompt de confirmation');
    if (promptConfirm) {
      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?' && !session.conversationData.travelform) {
        session.send('Navré mais pour cette version nous allons devoir organiser le voyage depuis Paris :( ');
        session.replaceDialog('confirmTravel');
      }

      if ((promptConfirm.message.text === 'Merci pour vos choix, c\'est bon pour tout le monde ?' || promptConfirm.message.text === 'On fait une réservation ?') &&
          (session.conversationData.travelform || session.conversationData.travelers)) {
        session.send('Ok on annule et on recommence');
        session.conversationData.travelform = undefined;
        session.conversationData.travelers = undefined;
        session.conversationData.propositions = undefined;
        session.replaceDialog('startTravel');
      }
    }
  }).triggerAction({matches: 'no'});
};