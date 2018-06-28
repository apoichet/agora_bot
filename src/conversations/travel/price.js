const builder = require('botbuilder');
const propositionEngine = require('../../services/pollPropositionEngine');
const dialog = require('../../config/dialog');

module.exports = (bot) => {
  bot.dialog('askPrice',
      async (session) => {
        // On verouille
        session.conversationData.travelform.date = false;
        session.conversationData.travelform.price = true;
        let prices = await propositionEngine.getPrices();
        builder.Prompts.choice(session, dialog.manageTravel.askPrice, prices.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};