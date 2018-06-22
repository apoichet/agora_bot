const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');

module.exports = (bot) => {
  bot.dialog('askDateDeparture',
      async (session, args, next) => {
        session.conversationData.travelform.destination = false;
        session.conversationData.travelform.date = true;
        let departures = await agoraBack.getDepartures();
        builder.Prompts.choice(session, 'Quel Vendredi soir (à partir de 18h) ?', departures.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};