const builder = require('botbuilder');
const propositionEngine = require('../../services/propositionEngine');

module.exports = (bot) => {
  bot.dialog('askDateDeparture',
      async (session, args, next) => {
        session.conversationData.travelform.destination = false;
        session.conversationData.travelform.datetime = true;
        let departures = await propositionEngine.getDepartures();
        builder.Prompts.choice(session, 'Quel Vendredi soir (à partir de 18h) ?', departures.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};