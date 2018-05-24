const builder = require('botbuilder');
const config = require('../config/index');
const {WELCOME, HELP} ={WELCOME:`Bonjour, je suis ${config.botname} !`,
  HELP:["J'aide à la reservation de groupe pour les voyages en train"]};

module.exports = (bot) => {
  bot.dialog('help', [(session, args, next) => {
    const manuel = new builder.Message(session)
    .attachments([
      new builder.HeroCard(session)
      .title(WELCOME)
      .text(HELP[Math.floor(Math.random() * HELP.length)])
      .images([builder.CardImage.create(session, config.image.url)])
    ]);
    session.send(manuel).endDialog();
  }]).triggerAction({matches: 'help'})
};