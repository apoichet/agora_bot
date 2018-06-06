const builder = require('botbuilder');

module.exports = (bot) => {

  bot.dialog('askPrice',
      (session, args, next) => {
        session.conversationData.travelform.datetime = false;
        session.conversationData.travelform.price = true;
        builder.Prompts.choice(session, "Quel Prix ?", "Moins de 50€|Moins de 80€|Plus de 80€", { listStyle: builder.ListStyle.button });
      }
  );

};