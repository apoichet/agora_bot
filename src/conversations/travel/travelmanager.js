const builder = require('botbuilder');
const telegramService = require('../../services/telegramService');

module.exports = (bot) => {

  //Confirme
  bot.dialog('confirmTravel', session => {
    builder.Prompts.choice(session, "On organise un voyage depuis Paris ?", "Oui|Non", { listStyle: builder.ListStyle.button });
  })
  .triggerAction({matches: ['inspiration', 'reservation']});

  //Start
  bot.dialog('startTravel',
      (session, args, next) => {
        console.log('On démarre le voyage');
        session.conversationData.travelform = {};
        session.beginDialog('askDestination');
      }
  );

  //Manage
  bot.dialog('manageTravel', [ async (session, args, next) => {

    //Recuperation du prompt
    const promptTravel = session.message.sourceEvent.callback_query;
    //Récupération du nombre de user dans la conversation
    session.conversationData.chatMembersCount = await telegramService.getChatMembersCount(session.message.address.conversation.id);

    if (promptTravel){

      if (!session.conversationData.travelform.travelers){
        session.conversationData.travelform.travelers = [];
      }

      let traveler;

      for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
        if (session.conversationData.travelform.travelers[iter]){
          if (session.conversationData.travelform.travelers[iter].id === promptTravel.from.id){
            traveler = session.conversationData.travelform.travelers[iter];
            break;
          }
        }
      }

      if (!traveler){
        traveler = {id:promptTravel.from.id, firstName:promptTravel.from.first_name};
        session.conversationData.travelform.travelers.push(traveler);
      }

      //User choice
      session.send(traveler.firstName+" a choisi "+promptTravel.data);

      // --------------------- Choix Destination --------------------------------------------------------------
      console.debug("Verrou destination",session.conversationData.travelform.destination);
      if (session.conversationData.travelform.destination && promptTravel.message.text === 'Quelle destination ?'){
        traveler.destination = promptTravel.data;
        console.debug("Choix de la destination",traveler.destination);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].destination){
            count++;
          }
        }
        console.debug("Nombre de réponses",count);

        if (count  === session.conversationData.chatMembersCount){
          session.beginDialog("askDateDeparture")
        }

      }

      // --------------------- Choix Date --------------------------------------------------------------
      console.debug("Verrou date",session.conversationData.travelform.date);
      if (session.conversationData.travelform.date && promptTravel.message.text === 'Quel Vendredi soir (à partir de 18h) ?'){
        traveler.date = promptTravel.data;
        console.debug("Choix de la date",traveler.date);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].date){
            count++;
          }
        }
        console.debug("Nombre de réponses",count);

        if (count  === session.conversationData.chatMembersCount){
          session.beginDialog("askPrice")
        }

      }

      // --------------------- Choix Prix --------------------------------------------------------------
      console.debug("Verrou prix",session.conversationData.travelform.price);
      if (session.conversationData.travelform.price && promptTravel.message.text === 'Quel prix ?'){
        traveler.price = promptTravel.data;
        console.debug("Choix du prix",traveler.price);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travelform.travelers.length; iter++) {
          if (session.conversationData.travelform.travelers[iter].price){
            count++;
          }
        }
        console.debug("Nombre de réponses",count);                                 

        if (count  === session.conversationData.chatMembersCount){
          builder.Prompts.choice(session, "Merci pour vos choix, c'est bon pour tout le monde ?", "Oui|Non", { listStyle: builder.ListStyle.button });
        }

      }

      console.log(session.conversationData.travelform.travelers);

    }
  },
  ])
};