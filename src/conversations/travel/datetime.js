const builder = require('botbuilder');

module.exports = (bot) => {

  bot.dialog('askDateDeparture',
      (session, args, next) => {
        builder.Prompts.choice(session, "Pour quand ?", "Aujourd'hui|Demain|Après demain", { listStyle: builder.ListStyle.button });
      }
  );

};