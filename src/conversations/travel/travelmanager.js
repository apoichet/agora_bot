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
        session.conversationData.travel = {};
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

      if (!session.conversationData.travel.travelers){
        session.conversationData.travel.travelers = [];
      }

      let traveler;

      for (let iter = 0; iter < session.conversationData.travel.travelers.length; iter++) {
        if (session.conversationData.travel.travelers[iter]){
          if (session.conversationData.travel.travelers[iter].id === promptTravel.from.id){
            traveler = session.conversationData.travel.travelers[iter];
            break;
          }
        }
      }

      if (!traveler){
        traveler = {id:promptTravel.from.id, firstName:promptTravel.from.first_name};
        session.conversationData.travel.travelers.push(traveler);
      }

      //User choice
      session.send(traveler.firstName+" a choisi "+promptTravel.data);

      console.debug("Verrou destination",session.conversationData.travel.destination);
      if (session.conversationData.travel.destination && promptTravel.message.text === 'Quelle destination ?'){
        traveler.destination = promptTravel.data;
        console.debug("Choix de la destination",traveler.destination);
        let count = 0;
        for (let iter = 0; iter < session.conversationData.travel.travelers.length; iter++) {
          if (session.conversationData.travel.travelers[iter].destination){
            count++;
          }
        }
        console.debug("Nombre de réponses",count);

        if (count  === session.conversationData.chatMembersCount){
          session.beginDialog("askDateDeparture")
        }

      }

      console.log(session.conversationData.travel.travelers);

    }
  },
  ])
};