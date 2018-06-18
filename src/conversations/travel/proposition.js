const propositionEngine = require('../../services/propositionEngine');
const builder = require('botbuilder');

/**
 * Permet d'afficher les propositions
 * @param {session} session the session
 * @param {propositions} propositions les propositions
 */
function sendingPropositions(session, propositions) {
  session.send('Ok, voila ce que je vous propose');
  let compteurProposition = 0;
  propositions.forEach((prop) => {
    compteurProposition++;
    session.send('N° ' + compteurProposition + ' - direction ' + prop.destination + ' le ' + prop.departureDate + ' à ' + prop.price);
  });
  // Propositions dans la session de conversation
  session.conversationData.propositions = propositions;
}

module.exports = (bot) => {
  bot.dialog('proposition', async (session) => {
    let propositions = await propositionEngine.buildPropositions(session.conversationData.travelers);

    // Egalité des scores de propositions
    if (propositions && propositions.length > 1) {
      let propositionsCopy = Array.from(propositions);
      let proposition1 = propositionsCopy.shift();
      let proposition2 = propositionsCopy.shift();
      if (proposition1.score === proposition2.score) {
        // Présence d'égalité on va recommencer
        session.send('Les choix sont à égalités, je vous laisse discuter entre vous pour refaire vos choix, du coup on recommence :)');
        session.conversationData.travelers = undefined;
        session.replaceDialog('startTravel');
      } else {
        sendingPropositions(session, propositions);
        builder.Prompts.choice(session, 'On fait une réservation ?', 'Oui|Non', {listStyle: builder.ListStyle.button});
      }
    } else {
      sendingPropositions(session, propositions);
      builder.Prompts.choice(session, 'On fait une réservation ?', 'Oui|Non', {listStyle: builder.ListStyle.button});
    }
  });
};