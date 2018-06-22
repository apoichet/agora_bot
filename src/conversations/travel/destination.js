const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('askDestination',
      async (session, args, next) => {
        // On vérouille
        session.conversationData.travelform.destination = true;
        let destinations = await agoraBack.getDestinations();
        builder.Prompts.choice(session, dialog.manageTravel.askDestination, destinations.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};