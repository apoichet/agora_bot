const propositionEngine = require('../../services/pollPropositionEngine');
const ouiSncfService = require('../../services/ouiSncfService');
const winston = require('../../config/winston');
const builder = require('botbuilder');
const moment = require('moment');

const travelers = require('../../conversations/travel/testtraveleres');

module.exports = (bot) => {
  bot.dialog('quote', async (session) => {
    session.send("Ok je vais voir ce que je peux faire");
    session.sendTyping();

    try {
      const proposals = await propositionEngine.buildProposals(session.conversationData.travelers);
      const quotations = await ouiSncfService.getQuotations(proposals);
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
    }
    catch (err) {
      if(err.statusCode === 409){
        session.send("Oups, vos choix sont à égalités, du coup il va falloir recommencer :(");
        session.replaceDialog("startTravel");
      }
      else{
        winston.error(err.statusCode + ' ' + err.error.message);
      }
    }
  });
};

function buildCarousel(session, quotations) {
  let carousel = [];
  quotations.forEach((quote) => {
    let price = quote.totalPrice/100;
    let pricePerPassenger = price/quote.passengers.length;
    let origin = quote.segments[0].origin.cityLabel;
    let destination = quote.segments[0].destination.cityLabel;
    let departureDate = moment(quote.departureDate).format("DD/MM/YYYY HH:mm");
    let arrivalDate = moment(quote.arrivalDate).format("DD/MM/YYYY HH:mm");
    let trainNumber = quote.segments[0].trainNumber;

    let quoteCarousel = new builder.HeroCard(session)
    .title('Départ '+origin+' le '+departureDate+'\n'
        +'Arrivée '+destination+' le '+arrivalDate+'\n'
        +'Prix : '+price+' € ('+pricePerPassenger+' € par perssone)\n'
        +'Numéro Train : '+trainNumber)
    .images([builder.CardImage.create(session, getImageUrl(destination))
    .tap(builder.CardAction.openUrl(session, 'https://www.oui.sncf'))])
    .buttons([builder.CardAction.openUrl(session, 'www.oui.sncf', 'Réserver sur oui.sncf')]);
    carousel.push(quoteCarousel);
  });
  return carousel;
}

function getImageUrl(cityLabel){
  switch (cityLabel){
    case "Lyon": return "http://www.olivierlegrand.fr/wp-content/uploads/2017/11/lyon.jpg";
    case "Marseille": return "http://ekladata.com/V-tdNTaDCemcedjo3mz0TK3hFHc.jpg";
    case "Bordeaux": return "http://www.properties-in-charente.com/images/bord.jpg";
  }
}



