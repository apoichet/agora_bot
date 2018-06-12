module.exports = (bot) => {
  bot.dialog('mistake', [
    (session, args, next) => {
      session.error(new Error("Oups, j'ai détecté une erreur, pouvez vous recommencer ?"));
    }
  ]).triggerAction({matches: 'mistake'})

};