const builder = require('botbuilder');
const propositionEngine = require('../../services/pollPropositionEngine');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('askDestination',
      async (session, args, next) => {
        // On vérouille
        session.conversationData.travelform.destination = true;
        let destinations = await propositionEngine.getDestinations();
        builder.Prompts.choice(session, dialog.manageTravel.askDestination, destinations.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};