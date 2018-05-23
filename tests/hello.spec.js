const builder = require('botbuilder');
const assert = require('assert');
const setup = require('../src/setup/bot');

describe('Conversation /hello', () => {

  let connector, bot;

  beforeEach(() => {
    connector = new builder.ConsoleConnector();
    bot = setup(connector);
  });

  it('should send greetings when user says hello', (done) => {
      bot.on('send', (message) => {
        const {text} = message;
        assert.equal(text, 'Salut');
        done();
      });
      connector.processMessage('hello');
  });
});