const request = require('request-promise-native');
const config = require('../config/index');

class TelegramService{

  constructor(){
   this._options = {
      method: 'get',
      json: true,
    };
  }

  async getChatMember(userId, chatId) {
    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatMember?user_id=${userId}&chat_id=${chatId}`;
    const response = await request(this._options);
    return response.result.user;
  }

  async getChatMembers(chatId) {

    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatAdministrators?chat_id=${chatId}`;

    const response = await request(this._options).then(response => {
      console.log(response);
      return response;
    });

    return response.result.user;
  }

  async getChatMembersCount(chatId) {

    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatMembersCount?chat_id=${chatId}`;

    const response = await request(this._options).then(response => {
      console.log(response);
      return response;
    });

    return response.result;
  }

}

module.exports = new TelegramService();