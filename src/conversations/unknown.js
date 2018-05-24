module.exports = (bot) => {

  bot.dialog('unknown', [
    (session, args, next) => {
      session.endDialog(['Désolé je ne comprends pas']);
    }
  ]).triggerAction({matches: 'unknown'})

};