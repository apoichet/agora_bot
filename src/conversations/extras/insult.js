const telegramService = require('../../services/telegramService');

module.exports = (bot) => {
  bot.dialog('insult', [
    (session, args) => {
      telegramService.getChatMember(args.intent.userId, args.intent.conversationId)
      .then((user) => {
        session.send('Toi même '+user.first_name+' !');
      });
    },
  ]).triggerAction({matches: 'insult'});
};