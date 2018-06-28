const request = require('request-promise-native');
const winston = require('../config/winston');
const moment = require('moment');

/**
 * class service oui sncf service
 */
class OuiSncfService {
  /**
   * constructor
   */
  constructor(){
    this._options = {
      json: true,
      method: 'get',
    };
  }

  /**
   * Methode qui permet de récupérer le Pnr depuis oui.sncf
   * @param contactLastName
   * @param idPnr
   * @returns {Promise<*>}
   */
  async getPnr(contactLastName, idPnr){
    this._options.url = 'https://www.oui.sncf/vsa/api/order/fr_FR/'
    + contactLastName + '/'
    + idPnr
    + '?source=AGORA&inventory=MI_WITH_FALLBACK';
    return await callOuiSncf(this._options);
  }

  /**
   * Permet de construire les devis issus du formulaire de propositions
   * @param proposals
   * @returns {Promise<Array>}
   */
  async getQuotations(proposals){
    let filterQuotations = [];
    for (let i = 0; i < proposals.length; i++) {
      this._options.url = buildUrl(proposals[i]);
      const quotations = await callOuiSncf(this._options);
      filterQuotations = filterQuotations.concat(quotations.filter(quote => {return isPollConditionOk(proposals[i], quote)}))
    }
    // On ne renvoit que 3 devis max
    return filterQuotations.slice(0, 3);
  }


}

async function callOuiSncf(options) {
  winston.info(`Appel oui sncf ${options.method} ${options.url}`);
  const response = await request(options);
  winston.info('Reponse oui sncf : '+response);
  return response;
}

function isPollConditionOk(proposal, quotation){
  let totalPrice = quotation.totalPrice/100;
  let pricePerPassenger = totalPrice/proposal.nbrPassenger;
  let isHourOk = moment(quotation.departureDate).hour() > 18;
  let isFistPriceOk = pricePerPassenger < 50 && proposal.price === '< 50 €';
  let isSecondPriceOk = pricePerPassenger < 80 && proposal.price === '< 80 €';
  let isThirdPriceOk = pricePerPassenger > 80 && proposal.price === '> 80 €';
  let isOneWay = quotation.segments.length === 1;
  return isHourOk && isOneWay && (isFistPriceOk || isSecondPriceOk || isThirdPriceOk);
}

function buildUrl(proposal){
  let splitDateDeparture = proposal.departureDate.split('/');
  let url = 'http://nucleus.eu-west-1.elasticbeanstalk.com/proposals/v1/FRPAR/'
      +getCityCode(proposal.destination)
      +'/'
      +'2018'+splitDateDeparture[1]+splitDateDeparture[0]
      +'/'
      +'2'
      +'/';
  let typoPax = [];
  for (let i = 0; i < proposal.nbrPassenger; i++) {
    typoPax.push('26-NO_CARD');
  }
  return url.concat(typoPax.join(','));
}


function getCityCode(city){
  switch (city){
    case 'Lyon': return 'FRLPD';
    case 'Bordeaux': return 'FRBOJ';
    case 'Marseille': return 'FRMRS';
  }
  return '';
}

module.exports = new OuiSncfService();