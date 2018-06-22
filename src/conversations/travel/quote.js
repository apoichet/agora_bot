const propositionEngine = require('../../services/propositionEngine');
const winston = require('../../config/winston');
const builder = require('botbuilder');
const telegramService = require('../../services/telegramService');

module.exports = (bot) => {
  bot.dialog('quote', async (session) => {
    session.send("Ok je vais voir ce que je peux faire");
    session.sendTyping();
    let proposals = await propositionEngine.buildProposals(session.conversationData.travelers);
    session.send("Voila ce que j\'ai trouvé !");
    session.conversationData.proposals = proposals;
    const msg = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(buildCarousel(session, proposals));
    session.send(msg);
  });
};

function buildCarousel(session, proposals) {
  let carousel = [];

  proposals.forEach((prop) => {
    let quoteCarousel = new builder.HeroCard(session)
    .title(prop.outwardOrigin+' - '+prop.outwardDestination+' à '+prop.price+' €/personne')
    .text('Départ : '+prop.departureDate+'\nArrivée : '+prop.arrivalDate)
    .images([builder.CardImage.create(session, prop.urlImage)])
    .buttons([builder.CardAction.openUrl(session, 'https://pythonhosted.org/telegram-send/', 'Réserver')]);
    carousel.push(quoteCarousel);
  });
  return carousel;
}

