const builder = require('botbuilder');
const propositionEngine = require('../../services/propositionEngine');

module.exports = (bot) => {
  bot.dialog('askPrice',
      async (session) => {
        // On verouille
        session.conversationData.travelform.date = false;
        session.conversationData.travelform.price = true;
        let prices = await propositionEngine.getPrices();
        builder.Prompts.choice(session, 'Quel prix ?', prices.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};