const builder = require('botbuilder');

module.exports = (bot) => {

  bot.dialog('askDestination',
      (session, args, next) => {
        //On vérouille
        session.conversationData.travelform.destination = true;
        builder.Prompts.choice(session, "Quelle destination ?", "Lyon|Marseille|Bordeaux", { listStyle: builder.ListStyle.button });
      }
  );

};