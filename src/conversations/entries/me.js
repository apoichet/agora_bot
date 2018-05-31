const builder = require('botbuilder');
const config = require('../../config/index');

const {WELCOME, HELP: Me} ={WELCOME:`Bonjour, je suis ${config.botname} !`,
  HELP:["J'aide à la reservation de groupe pour les voyages en train"]};

module.exports = (bot) => {

  bot.dialog('me', (session, args, next) => {
    const me = new builder.Message(session)
    .attachments([
      new builder.HeroCard(session)
      .title(WELCOME)
      .text(Me[Math.floor(Math.random() * Me.length)])
      .images([builder.CardImage.create(session, config.image.url)])]);
    session.send(me);
    session.beginDialog('confirmJourney');
  }).triggerAction({matches: ['help','who_are_you']});

};