const builder = require('botbuilder');
module.exports = (bot) => {
  bot.dialog('reservation', async (session) => {
    session.send('C\'est fait !');
    session.send('Je récapitule :)');
    let reservation = session.conversationData.reservationQuote;
    const msg = new builder.Message(session)
    .attachments([
      new builder.HeroCard(session)
      .title('Origine : '+reservation.outwardOrigin+' Destination : '+reservation.outwardDestination)
      .text('Départ : '+reservation.departureDate+'\nArrivée : ' +reservation.arrivalDate
          +'\nNombre de passagers : '+reservation.nbrPassenger
          +'\nPrix : '+reservation.price + ' € soit '+ (reservation.price/reservation.nbrPassenger)+' € par personne')
      .buttons([builder.CardAction.postBack(session, 'Payer', 'Payer')])
    ]);
    session.send(msg);
  });
};