module.exports = (bot) => {

  bot.dialog('departure', [
    async (session, args, next) => {
      console.log('session from departure',session);
      session.sendTyping();
      await session.send("Youpi");
    }
  ]).triggerAction({matches: 'departure'})

};