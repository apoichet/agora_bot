module.exports = (bot) => {
  bot.dialog('unknown', [
    (session) => {
      session.endDialog(['Je n\'ai pas compris, vous pouvez réessayer ?']);
    },
  ]).triggerAction({matches: 'wrong_answer'});
};