module.exports = (bot) => {
  bot.dialog('agreement', [
    (session, args, next) => {
      session.send('Bah c\'est bien !');
    },
  ]).triggerAction({matches: 'agreement'});
};