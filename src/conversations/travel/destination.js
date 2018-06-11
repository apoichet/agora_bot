const builder = require('botbuilder');
const propositionEngine = require('../../services/propositionEngine');

module.exports = (bot) => {

  bot.dialog('askDestination',
      async (session, args, next) => {
        //On vérouille
        session.conversationData.travelform.destination = true;
        let destinations = await propositionEngine.getDestinations();
        builder.Prompts.choice(session, "Quelle destination ?", destinations.join('|'), { listStyle: builder.ListStyle.button });
      }
  );

};