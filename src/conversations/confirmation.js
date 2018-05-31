module.exports = (bot) => {

  bot.dialog('confirmationYes', (session, args, next) => {

    const promptConfirm = session.message.sourceEvent.callback_query;

    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?'){
        //Nouvelle session
        session.conversationData.journey = {};
        session.beginDialog("startJourney");
      }

      if (promptConfirm.message.text === "C'est bon pour tout le monde ?"){
        session.send("Ok on va faire des propositions");
      }
    }
  }).triggerAction({matches: 'yes'});

  bot.dialog('confirmationNo', (session, args, next) => {
    
    const promptConfirm = session.message.sourceEvent.callback_query;
    
    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?'){
        session.endConversation('Ok Dommage !');
      }

    }


  }).triggerAction({matches: 'no'})

};