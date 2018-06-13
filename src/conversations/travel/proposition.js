const propositionEngine = require('../../services/propositionEngine');

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
    session.send('N° ' + compteurProposition + '' - direction + '' + prop.destination + ' le ' + prop.departureDate + ' à ' + prop.price);
  });
}

module.exports = (bot) => {
  bot.dialog('proposition', async (session) => {
    console.debug('Appel moteur de proposition');
    let propositions = await propositionEngine.buildPropositions(session.conversationData.travelers);
    console.debug('Réponse moteur de proposition', propositions);

    // Test égalité des scores de propositions
    if (propositions && propositions.length > 1) {
      let propositionsCopy = Array.from(propositions);
      let proposition1 = propositionsCopy.shift();
      let proposition2 = propositionsCopy.shift();
      if (proposition1.score === proposition2.score) {
        // Présence d'égalité on va recommencer
        session.send('Les choix sont à égalités, je vous laisse discuté entre vous pour refaire vos choix :)');
        session.conversationData.travelers = undefined;
        session.replaceDialog('startTravel');
      } else {
        sendingPropositions(session, propositions);
      }
    } else {
      sendingPropositions(session, propositions);
    }
  });
};