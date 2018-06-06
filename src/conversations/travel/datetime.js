const builder = require('botbuilder');
const moment = require('moment');

module.exports = (bot) => {

  bot.dialog('askDateDeparture',
      (session, args, next) => {
        session.conversationData.travel.destination = false;
        session.conversationData.travel.datetime = true;

        let momentFriday = moment().day('friday');
        let friday = momentFriday.format("DD/MM");
        let nextFriday = momentFriday.add(7, 'days').format("DD/MM");
        let afterNextFriday = momentFriday.add(7, 'days').format("DD/MM");

        builder.Prompts.choice(session, "Quel Vendredi soir (à partir de 18h) ?", friday +"|"+nextFriday +"|"+afterNextFriday, {listStyle: builder.ListStyle.button });
      }
  );

};