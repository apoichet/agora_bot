const builder = require('botbuilder');
const agoraBack = require('../../services/agoraBackEngine');

module.exports = (bot) => {
  bot.dialog('askPrice',
      async (session) => {
        // On verouille
        session.conversationData.travelform.date = false;
        session.conversationData.travelform.price = true;
        let prices = await agoraBack.getPrices();
        builder.Prompts.choice(session, 'Quel prix ?', prices.join('|'), {listStyle: builder.ListStyle.button});
      }
  );
};