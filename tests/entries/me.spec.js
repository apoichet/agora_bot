/* eslint-disable one-var */
const builder = require('botbuilder');
const config = require('../../src/config/index');
const expect = require('chai').expect;
const setup = require('../../src/setup/bot');
require('sinon-as-promised');

describe('Conversation /greetings', () => {
  let connector, bot;

  beforeEach(() => {
    connector = new builder.ConsoleConnector();
    bot = setup(connector);
  });

  it('should ask begin travel when user send help', (done) => {
    let count = 1;
    bot.on('send', (message) => {
      if (count === 2) {
        expect(message.text).to.not.be.undefined;
        expect(message.text).to.equal('On organise un voyage depuis Paris ?');
      }
      count++;
    });
    connector.processMessage(config.talkbot+' help');
    done();
  });
});