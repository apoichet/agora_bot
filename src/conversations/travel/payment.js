const builder = require('botbuilder');
const request = require('request-promise-native');
const telegramService = require('../../services/telegramService');
const ouiSncfService = require('../../services/ouiSncfService');
const dialog = require('../../config/dialog');
const winston = require('../../config/winston');
const config = require('../../config/index');
const moment = require('moment');


module.exports = (bot) => {

  bot.dialog('confirmPayment', async (session) => {
    const user = await telegramService.getChatMember(session.message.address.user.id, session.message.address.conversation.id);
    session.conversationData.payerQuotation = user;
    builder.Prompts.choice(session, dialog.confirmPayment+user.first_name +' ?',
        dialog.confirmYes+'|'+dialog.confirmNo, {listStyle: builder.ListStyle.button});
  });

  bot.dialog('refPayment', (session) => {
    //Check ref PNR
    if (!session.conversationData.refPayment){
      session.send('Pouvez vous renseigner la référence de votre voyage');
      session.conversationData.refPayment = 'UNKNWON';
    } 
    else {
      session.send('Je vais checker la référence...');
      session.sendTyping();
      ouiSncfService.getPnr(session.conversationData.payerQuotation.last_name, session.conversationData.refPayment)
      .then((pnr)=> {
        session.conversationData.pnr = pnr.order.trainFolders[session.conversationData.refPayment];
        session.conversationData.pnr.contact = pnr.order.initialContact;
        session.conversationData.refPayment=undefined;
        session.beginDialog('payment');
      })
      .catch(err=>{
        session.send('Oups, je n\'ai pas réussi à retrouver votre dossier voyage :(');
        winston.error(err);
      })
    }
  });

  bot.dialog('payment', (session) => {
    session.send('Je l\'ai trouvé !');
   let pnr = session.conversationData.pnr;
   let payer = session.conversationData.payerQuotation;
   let travel = pnr.travels[0];
   let trainNumber = travel.segments[0].trainNumber;

   session.send(pnr.reference+' : '
       +travel.origin.cityName
       +' - '+travel.destination.cityName
       +' le '+moment(travel.departureDate).format("DD/MM/YYYY HH:mm")
       +' à '+pnr.amount+' €'
       +' Train n°'+trainNumber);

   let pricePerPassenger = pnr.amount/pnr.passengers.length;
   let paypalLink = config.paypalMe.url
       +payer.first_name
       +payer.last_name
       +'/'
       +pricePerPassenger;
   let options = {
     method: 'get',
     json: true,
     url: paypalLink,
   };
   request(options)
   .then(() => {
     const paymentButton = new builder.Message(session)
     .attachments([new builder.HeroCard(session)
     .title('Ci dessous le bouton de paiement')
     .buttons([builder.CardAction.openUrl(session, paypalLink, 'Payer '+payer.first_name+' '+pricePerPassenger+' €')])]);
     session.send(paymentButton);
   })
   .catch(err => {
     winston.error(err);
     session.send(payer.first_name+', le lien de paiement : '+paypalLink+' ne fonctionne pas :( ');
     session.send('Pouvez vous renseigner un lien de paiement paypal valide stp');
   });

  });

};