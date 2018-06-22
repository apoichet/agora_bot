const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('askDateDeparture',
      async (session, args, next) => {
        session.conversationData.travelform.destination = false;
        session.conversationData.travelform.date = true;
        let departures = await agoraBack.getDepartures();
        builder.Prompts.choice(session, dialog.manageTravel.askDepartureDate, departures.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};