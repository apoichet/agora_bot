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

        const carousselQuote = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(buildCarousel(session, quotations));
        session.conversationData.quotations = quotations;
        session.send(carousselQuote);

        const nextPayment = new builder.Message(session)
        .attachments([new builder.HeroCard(session)
        .title('Après avoir effectuer la réservation, vous pouvez obtenir le paiement des autres voyageurs via un lien paypal')
        .buttons([builder.CardAction.postBack(session, 'obtainPayement', 'Obtenir le paiement')])]);
        session.send(nextPayment)

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
        winston.error(err.statusCode + ' ' + err.error.message);
      }});
  });
};

function buildCarousel(session, quotations) {
  let carousel = [];
  quotations.forEach((quote) => {
    let pricePerPassenger = quote.price/quote.nbrPassenger;
    let quoteCarousel = new builder.HeroCard(session)
    .title('N° '+quote.id+' '+quote.outwardOrigin+' - '+quote.outwardDestination+' à '
        +quote.price+' € ('+pricePerPassenger+' € par perssone)')
    .text('Départ : '+quote.departureDate+'\nArrivée : ' +quote.arrivalDate+'\n\n'+quote.fareCondition)
    .images([builder.CardImage.create(session, quote.urlImage)
    .tap(builder.CardAction.openUrl(session, 'https://www.oui.sncf'))])
    .buttons([builder.CardAction.openUrl(session, 'www.oui.sncf', 'Réserver sur oui.sncf')]);
    carousel.push(quoteCarousel);
  });
  return carousel;
}

