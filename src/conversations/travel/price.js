const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('askPrice',
      async (session) => {
        // On verouille
        session.conversationData.travelform.date = false;
        session.conversationData.travelform.price = true;
        let prices = await agoraBack.getPrices();
        builder.Prompts.choice(session, dialog.manageTravel.askPrice, prices.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};