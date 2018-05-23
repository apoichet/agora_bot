const builder = require('botbuilder');
const assert = require('assert');
const setup = require('../src/setup/bot');

describe('Welcome', () => {

  let connector, bot;

  beforeEach(() => {
    connector = new builder.ConsoleConnector();
    bot = setup(connector);
  });

  it('should send greetings when conversation update', (done) => {
    bot.on('conversationUpdate', (message) => {
      const {text} = message;
      assert.equals(text, "h");
      done();
    });
    connector.startConversation();
  });
});