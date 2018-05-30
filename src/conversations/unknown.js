module.exports = (bot) => {

  bot.dialog('unknown', [
    (session, args, next) => {
      session.endDialog(["Je n'ai pas compris, vous pouvez réessayer ?"]);
    }
  ]).triggerAction({matches: 'wrong_answer'})

};