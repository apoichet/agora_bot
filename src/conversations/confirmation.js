module.exports = (bot) => {

  bot.dialog('confirmationYes', (session, args, next) => {

    const promptConfirm = session.message.sourceEvent.callback_query;

    console.debug("Réponse positive du prompt de confirmation ",promptConfirm);
    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?'){
        session.beginDialog("startTravel");
      }

      if (promptConfirm.message.text === "C'est bon pour tout le monde ?"){
        session.send("Ok c'est parti !");
      }
    }
  }).triggerAction({matches: 'yes'});

  bot.dialog('confirmationNo', (session, args, next) => {
    
    const promptConfirm = session.message.sourceEvent.callback_query;
    console.debug("Réponse négative du prompt de confirmation ",promptConfirm);
    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?'){
        session.send("Navré mais pour cette version nous allons devoir organiser le voyage depuis Paris :( ");
        session.replaceDialog("confirmTravel")
      }

      if (promptConfirm.message.text === "C'est bon pour tout le monde ?"){
        session.send("Ok on annule et on recommence");
        session.conversationData.travel = undefined;//On vide le voyage rattaché à la session
        session.beginDialog("startTravel")

      }

    }
  }).triggerAction({matches: 'no'})

};