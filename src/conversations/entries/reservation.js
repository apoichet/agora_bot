module.exports = (bot) => {
  bot.dialog('reservation', async (session, args, next) => {
    session.beginDialog('confirmTravel');
  }).triggerAction({matches: 'reservation'});
};