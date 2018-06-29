const telegramService = require('../../services/telegramService');

const GREETINGS = ['Salut ', 'Hello ', 'Coucou ', 'Bonjour '];

module.exports = (bot) => {
  bot.dialog('greetings', async (session, args) => {
    //On vide la session de conversation en gardant le first run
    session.conversationData = {};
    session.conversationData.firstRun = true;

    const user = await telegramService.getChatMember(args.intent.userId, args.intent.conversationId);
    let greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    session.send(greeting + user.first_name);
    if (!session.conversationData.travelform) {
      session.beginDialog('confirmTravel');
    }
  }).triggerAction({matches: 'greetings'});
};