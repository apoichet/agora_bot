module.exports = (bot) => {
  bot.dialog('reservation', async (session) => {
    session.conversationData.propositions.forEach((proposition) => {
      session.send('Je tente une réservation');
      // On tente une réservation
      // Dès que qu'on a une première résa de réussi on s'arrête
      // Sinon on continue
      // Si pas de résa alors renvoit message aux users il faut recommencer.
    });
  });
};