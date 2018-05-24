const telegramService = require('../services/telegramService');
const GREETINGS = ['Salut ', 'Hello ', 'Coucou ', 'Bonjour '];

module.exports = (bot) => {
  bot.dialog('greetings', [(session, args, next) => {
    telegramService.getChatMember(args.intent.userId, args.intent.conversationId)
    .then(user => {
      let greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      session.send(greeting+user.first_name);
    });
  }]).triggerAction({matches: 'greetings'})
};