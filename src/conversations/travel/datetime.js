const builder = require('botbuilder');

module.exports = (bot) => {

  bot.dialog('askDateDeparture',
      (session, args, next) => {
        session.conversationData.travel.destination = false;
        session.conversationData.travel.datetime = true;
        builder.Prompts.choice(session, "Pour quand ?", "Aujourd'hui|Demain|Après demain", { listStyle: builder.ListStyle.button });
      }
  );

};