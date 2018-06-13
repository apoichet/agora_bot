module.exports = (bot) => {
  bot.dialog('joke', [
    (session, args, next) => {
      session.send('Désolé, je n\'ai pas été programmé pour comprendre l\'humour, je suis en version \'gros\' béta !');
    },
  ]).triggerAction({matches: 'joke'});
};