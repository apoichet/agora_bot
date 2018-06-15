/* eslint-disable one-var */
const builder = require('botbuilder');
const config = require('../../src/config/index');
const expect = require('chai').expect;
const setup = require('../../src/setup/bot');
const sinon = require('sinon');
require('sinon-as-promised');

const telegramService = require('../../src/services/telegramService');

describe('Conversation /greetings', () => {
  let connector, bot, mockTelegram;

  beforeEach(() => {
    connector = new builder.ConsoleConnector();
    bot = setup(connector);
    mockTelegram = sinon.mock(telegramService);
    mockTelegram.expects('getChatMember')
    .once()
    .withArgs('user', 'Convo1')
    .resolves({first_name: 'Alex'});
  });

  it('should ask begin travel when user send greetings', (done) => {
    let count = 1;
    bot.on('send', (message) => {
      switch (count) {
        case 2: expect(message.text).to.include('Alex'); break;
        case 3: expect(message.text).to.equal('On organise un voyage depuis Paris ?');
      }
      count++;
      mockTelegram.verify();
      mockTelegram.restore();
    });
    connector.processMessage(config.talkbot+' hello');
    done();
  });
});