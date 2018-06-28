/**
 * class service oui sncf service
 */
class OuiSncfService {
  /**
   * constructor
   */
  constructor() {
    this._options = {
      json: true,
    };
  }

  async getPnr(contactLastName, idPnr){
    this._options.method = 'get';
    this._options.url = 'https://www.oui.sncf/vsa/api/order/fr_FR/'
    + contactLastName + '/'
    + idPnr
    + '?source=AGORA&inventory=MI_WITH_FALLBACK';
    const pnr = callOuiSncf(this._options);
    return pnr;
  }
}

async function callOuiSncf(options) {
  winston.info(`Appel oui sncf ${options.method} ${options.url}`);
  const response = await request(options);
  winston.info('Reponse oui sncf : '+response);
  return response;
}

module.exports = new OuiSncfService();