const winston = require('../../config/winston');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('confirmationYes', async (session) => {
    const promptConfirm = session.message.sourceEvent.callback_query;
    winston.debug('Réponse positive du prompt de confirmation');
    if (promptConfirm) {
      if (promptConfirm.message.text === dialog.confirmTravel && !session.conversationData.travelform) {
        session.beginDialog('startTravel');
      }

      if (promptConfirm.message.text === dialog.confirmQuote && session.conversationData.travelform) {
        // On stock le choix des utilisateurs
        session.conversationData.travelers = session.conversationData.travelform.travelers;
        // On vide le formulaire
        session.conversationData.travelform = undefined;
        session.beginDialog('quote');
      }

      // Confirmation de paiement
      if (promptConfirm.message.text.includes(dialog.confirmPayment) && session.conversationData.quotations) {
        session.beginDialog('refPayment');
      }
    }
  }).triggerAction({matches: 'yes'});

  bot.dialog('confirmationNo', (session) => {
    const promptConfirm = session.message.sourceEvent.callback_query;
    winston.debug('Réponse négative du prompt de confirmation');
    if (promptConfirm) {
      if (promptConfirm.message.text === dialog.confirmTravel && !session.conversationData.travelform) {
        session.send('Navré mais pour cette version nous allons devoir organiser le voyage depuis Paris :( ');
        session.replaceDialog('confirmTravel');
      }

      if ((promptConfirm.message.text === dialog.confirmQuote || promptConfirm.message.text.includes(dialog.confirmReservation)) &&
          (session.conversationData.travelform || session.conversationData.travelers)) {
        session.send('Ok on annule et on recommence');
        session.conversationData = {};
        session.replaceDialog('startTravel');
      }
      
      if (promptConfirm.message.text.includes(dialog.confirmPayment)){
        session.send('Ok, quelqu\'un d\'autre ?')
      }
    }
  }).triggerAction({matches: 'no'});
};