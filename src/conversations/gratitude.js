const telegramService = require('../services/telegramService');
const WELCOM = ["De rien ", "C'est un plaisir ", 'A votre service ', 'Je ne fais que mon devoir '];

module.exports = (bot) => {
  bot.dialog('gratitude', [(session, args, next) => {
    telegramService.getChatMember(args.intent.userId, args.intent.conversationId)
    .then(user => {
      let welcom = WELCOM[Math.floor(Math.random() * WELCOM.length)];
      session.send(welcom+user.first_name);
    });
  }]).triggerAction({matches: 'gratitude'})
};