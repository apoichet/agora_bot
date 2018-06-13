const request = require('request-promise-native');
const config = require('../config/index');

/**
 * class service telegram
 */
class TelegramService {
  /**
   * constructor
   */
  constructor() {
   this._options = {
      method: 'get',
      json: true,
    };
  }

  /**
   * Renvoit le chat membre d'une conversation
   * @param {userId} userId
   * @param {chatId} chatId
   * @return {Promise<IIdentity | {id: string, name: string} | user | {id, name} | *>}
   */
  async getChatMember(userId, chatId) {
    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatMember?user_id=${userId}&chat_id=${chatId}`;
    const response = await request(this._options);
    return response.result.user;
  }

  /**
   * Renvoit les membres d'une conversation
   * @param {chatId} chatId
   * @return {Promise<*>}
   */
  async getChatMembers(chatId) {
    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatAdministrators?chat_id=${chatId}`;
    const response = await request(this._options);
    return response.result;
  }

  /**
   * Renvoit le nombre de chat member d'une conversation
   * @param {chatId} chatId
   * @return {Promise<number>}
   */
  async getChatMembersCount(chatId) {
    this._options.url = `https://api.telegram.org/bot${config.platforms.telegram.token}/getChatMembersCount?chat_id=${chatId}`;
    const response = await request(this._options);
    // On soustrait le chat bot
    return response.result - 1;
  }
}

module.exports = new TelegramService();