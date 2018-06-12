const propositionEngine = require('../../services/propositionEngine');

module.exports = (bot) => {

  bot.dialog('confirmationYes', async (session, args, next) => {

    const promptConfirm = session.message.sourceEvent.callback_query;

    console.debug("Réponse positive du prompt de confirmation ",promptConfirm);
    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?' && !session.conversationData.travelform){
        session.beginDialog("startTravel");
      }

      if (promptConfirm.message.text === "Merci pour vos choix, c'est bon pour tout le monde ?" && session.conversationData.travelform){
        session.conversationData.travelers = session.conversationData.travelform.travelers;//On stock le choix des utilisateurs
        session.conversationData.travelform = undefined;//On vide le formulaire
        session.send("Ok c'est parti !");
        session.sendTyping();

        //Appel au moteur de proposition
        let propositions = await propositionEngine.buildPropositions(session.conversationData.travelers);
        session.send("Voila ce que je vous propose");
        let compteurProposition = 0;
        propositions.forEach(prop => {
          compteurProposition++;
          session.send("Numéro "+compteurProposition+" - Destination : "+prop.destination+" - Date : "+prop.departureDate+" - Prix : "+prop.price);
        })

      }
    }
  }).triggerAction({matches: 'yes'});

  bot.dialog('confirmationNo', (session, args, next) => {
    
    const promptConfirm = session.message.sourceEvent.callback_query;
    console.debug("Réponse négative du prompt de confirmation ",promptConfirm);
    if (promptConfirm){

      if (promptConfirm.message.text === 'On organise un voyage depuis Paris ?' && !session.conversationData.travelform){
        session.send("Navré mais pour cette version nous allons devoir organiser le voyage depuis Paris :( ");
        session.replaceDialog("confirmTravel")
      }

      if (promptConfirm.message.text === "C'est bon pour tout le monde ?"){
        session.send("Ok on annule et on recommence");
        session.replaceDialog("startTravel")

      }

    }
  }).triggerAction({matches: 'no'})

};