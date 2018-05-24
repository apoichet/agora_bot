module.exports = (bot) => {

  bot.dialog('reservation', [
    (session, args, next) => {
      console.log(args);
      session.send("ok on va faire un voyage");
    }
  ]).triggerAction({matches: 'reservation'})

};