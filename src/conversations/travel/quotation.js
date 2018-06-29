const propositionEngine = require('../../services/pollPropositionEngine');
const ouiSncfService = require('../../services/ouiSncfService');
const winston = require('../../config/winston');
const builder = require('botbuilder');
const moment = require('moment');
const config = require('../../config/index');

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
    let nbPassenger = quote.passengers.length;
    let pricePerPassenger = price/nbPassenger;
    let origin = quote.segments[0].origin.cityLabel;
    let destination = quote.segments[0].destination.cityLabel;
    let departureDate = moment(quote.departureDate).format("DD/MM/YYYY HH:mm");
    let arrivalDate = moment(quote.arrivalDate).format("DD/MM/YYYY HH:mm");
    let trainNumber = quote.segments[0].trainNumber;

    let quoteLink = buildQuoteLink(quote);

    let quoteCarousel = new builder.HeroCard(session)
    .title('Départ '+origin+' le '+departureDate+'\n'
        +'Arrivée '+destination+' le '+arrivalDate+'\n'
        +'Prix : '+price+' € ('+pricePerPassenger+' € par perssone)\n'
        +'Numéro Train : '+trainNumber)
    .images([builder.CardImage.create(session, getImageUrl(destination))
    .tap(builder.CardAction.openUrl(session, quoteLink))])
    .buttons([builder.CardAction.openUrl(session, quoteLink, 'Réserver sur oui.sncf')]);
    carousel.push(quoteCarousel);
  });
  return carousel;
}

function buildQuoteLink(quotation) {
  let typoPax = [];
  for (let i = 0; i < quotation.passengers.length; i++) {
    typoPax.push('26-NO_CARD');
  }
  return 'https://www.oui.sncf/calendar/'
      +quotation.segments[0].origin.rrcode+'/'
      +quotation.segments[0].destination.rrcode+'/'
      +moment(quotation.departureDate).format('YYYYMMDD')+'/'
      +'ONE_WAY/'
      +'2/'
      +typoPax.join(',')+'/'
      +quotation.segments[0].origin.rrcode+'-'
      +quotation.segments[0].destination.rrcode+'-'
      +moment(quotation.departureDate).format('YYYYMMDD')+'-'
      +moment(quotation.arrivalDate).format('YYYYMMDD')+'-'
      +'26-NO_CARD-2-'
      +quotation.segments[0].trainNumber+'-false-FR'
      +'?onlyDirectTrains=true&currency=EUR&lang=fr';
}

function getImageUrl(cityLabel){
  switch (cityLabel){
    case "Lyon": return config.image.url_lyon;
    case "Marseille": return config.image.url_marseille;
    case "Bordeaux": return config.image.url_bordeaux;
  }
}



