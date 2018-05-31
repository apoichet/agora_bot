const builder = require('botbuilder');

module.exports = (bot) => {

  //Confirme
  bot.dialog('confirmJourney', session => {
    builder.Prompts.choice(session, "On organise un voyage depuis Paris ?", "Oui|Non", { listStyle: builder.ListStyle.button });
  })
  .triggerAction({matches: ['confirmJourney', 'inspiration', 'reservation']});

  //Start
  bot.dialog('startJourney',
      (session, args, next) => {
        console.log('On démarre le voyage');
        session.beginDialog('askDestination');
        //session.beginDialog('askDateDeparture');
        /*builder.Prompts.choice(session, "Quelle destination ?", "Lyon|Lille|Bordeaux", { listStyle: builder.ListStyle.button });
        builder.Prompts.choice(session, "Pour quand ?", "Aujourd'hui|Demain|Après demain", { listStyle: builder.ListStyle.button });
        builder.Prompts.choice(session, "Quel Prix ?", "Moins de 50€|Entre 50 et 100€|Plus de 100€", { listStyle: builder.ListStyle.button });*/
      }
  );

  //Complete
  bot.dialog('completeJourney', [(session, args, next) => {

      //Recuperation du prompt
      const promptJourney = session.message.sourceEvent.callback_query;

      if (promptJourney){
        if (!session.conversationData.journey.travelers){
          session.conversationData.journey.travelers = [];
        }

        let traveler;

        for (let iter = 0; iter < session.conversationData.journey.travelers.length; iter++) {
          if (session.conversationData.journey.travelers[iter]){
            if (session.conversationData.journey.travelers[iter].id === promptJourney.from.id){
              traveler = session.conversationData.journey.travelers[iter];
            }
          }
        }

        if (!traveler){
          traveler = {id:promptJourney.from.id, firstName:promptJourney.from.first_name};
          session.conversationData.journey.travelers.push(traveler);
        }
        if (promptJourney.message.text === 'Quelle destination ?'){
          traveler.destination = promptJourney.data;
        }

        if (promptJourney.message.text === 'Pour quand ?'){
          traveler.datetime = promptJourney.data;
        }

        if (promptJourney.message.text === 'Quel Prix ?'){
          traveler.price = promptJourney.data;
        }

        session.send(traveler.firstName+" a choisi "+promptJourney.data);

        if (traveler.destination && traveler.datetime && traveler.price){
          session.send("Merci "+traveler.firstName);
          session.send("Je récapitule ton choix");
          session.send("Destination "+traveler.destination+' - Date '+traveler.datetime+' - Prix '+traveler.price)
        }

        console.log(session.conversationData.journey.travelers);
      }
    },
  ])


};