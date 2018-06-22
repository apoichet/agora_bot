const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');

module.exports = (bot) => {
  bot.dialog('askDestination',
      async (session, args, next) => {
        // On vérouille
        session.conversationData.travelform.destination = true;
        let destinations = await agoraBack.getDestinations();
        builder.Prompts.choice(session, 'Quelle destination ?', destinations.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};