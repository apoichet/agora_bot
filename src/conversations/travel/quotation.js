const agoraBack = require('../../services/agoraBackEngine');
const winston = require('../../config/winston');
const builder = require('botbuilder');

module.exports = (bot) => {
  bot.dialog('quote', async (session) => {
    session.send("Ok je vais voir ce que je peux faire");
    session.sendTyping();
    agoraBack.buildProposals(session.conversationData.travelers)
    .then(async (proposals) => {
      let quotations = await agoraBack.buildQuotations(proposals);
      if (quotations && quotations.length > 0){
        session.send("Voila ce que j\'ai trouvé !");
        const msg = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(buildCarousel(session, quotations));
        session.send(msg);
      }
      else {
        session.send("Malheuresement je n'ai rien trouvé :( \n On recommence ?");
        session.beginDialog("confirmTravel");
      }

    })
    .catch((err) => {
      if(err.statusCode === 409){
        session.send("Oups, vos choix sont à égalités, du coup il va falloir recommencer :(");
        session.replaceDialog("startTravel");
      }
      else{
        winston.error(err);
      }});
  });
};

function buildCarousel(session, quotations) {
  let carousel = [];

  quotations.forEach((quote) => {
    let quoteCarousel = new builder.HeroCard(session)
    .title(quote.outwardOrigin+' - '+quote.outwardDestination+' à '+quote.price+' €/personne')
    .text('Départ : '+quote.departureDate+'\nArrivée : '+quote.arrivalDate)
    .images([builder.CardImage.create(session, quote.urlImage)])
    .buttons([builder.CardAction.openUrl(session, 'https://pythonhosted.org/telegram-send/', 'Réserver')]);
    carousel.push(quoteCarousel);
  });
  return carousel;
}

