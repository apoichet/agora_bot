module.exports = (bot) => {
  bot.dialog('mistake', [
    (session) => {
      session.error(new Error('Oups, j\'ai détecté une erreur, pouvez vous recommencer ?'));
    },
  ]).triggerAction({matches: 'mistake'});
};