const builder = require('botbuilder');

module.exports = (bot) => {

  bot.dialog('askPrice',
      (session, args, next) => {
        session.conversationData.travel.price = true;
        builder.Prompts.choice(session, "Quel Prix ?", "Moins de 50€|Entre 50 et 100€|Plus de 100€", { listStyle: builder.ListStyle.button });
      }
  );

};