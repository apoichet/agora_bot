const request = require('request-promise-native');
const config = require('../config/index');
const telegramService = require('../services/telegramService');

module.exports = (bot) => {
  bot.dialog('welcome', [(session, args, next) => {
    if (!args){
      session.send('Bonjour et bienvenue, je suis Agora Bot !');
      next()
    }else{
      telegramService.getChatMember(args.intent.userId, args.intent.conversationId)
      .then(user => {
        let greetings = ['Salut ', 'Hello ', 'Coucou ', 'Bonjour '];
        let greeting = greetings[Math.floor(Math.random() * greetings.length)];
        session.endDialog(greeting+user.first_name);
      });
      session.sendTyping();
    }
  },
    (session) => {
    session.endDialog(`J'ai pour but de réaliser des réservations de groupe`);
  }]).triggerAction({matches: 'welcome'})
};