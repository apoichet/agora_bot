module.exports = (bot) => {

  bot.dialog('unknown', [
    async (session, args, next) => {
      await session.send(['Désolé je ne comprends pas']);
    }
  ]).triggerAction({matches: 'unknown'})

};