const path = require('path');

module.exports = {
  nlp: {
    tock: {
      context: {
        language: 'fr',
        clientId: 'inno',
        dialogId: 'inno',
        clientDevice: 'inno',
        referenceTimezone: 'Europe/Paris',
      },
      namespace: 'vsc',
      appName: 'agora-bot',
      url: 'http://TOCK.lab-o.io:8888/rest/nlp/parse',
      header: {
        'X-APP-NAMESPACE': 'vsc=az#_1A',
      },
      timeout: 2000,
    },
    api: {
      token: '002798ccc57048eab6eb8cac3597f9a1',
    },
    aviato: {
      header: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      url: 'http://aviato.eu-west-1.elasticbeanstalk.com/nlp/v1/message',
    },
  },
  platforms: {
    botframework: {
      id: '10e3ff27-5b1a-43b5-958b-b62e3b06ec57',
      token: 'vgkbmVFH200^=mbAQAT53[+',
    },
    messenger: {
      token: 'EAACuB417oB0BAEFIOUZAcGYFi9I2PWzZAkUpZAV7rjZCunQsIGgmRdfhDZA0JryLQpVQmjKjj7bNsf7TfHumeS4Ita7OUxA6KydK4jHaiiDTrOBHi2a30g96vr6AiikmEaJoHLVi93xtXoLWlzBm0zlxZAZCFG5htkkygETC9YLbgZDZD',
    },
    telegram: {
      token: '501507889:AAHzo-Mk7Bdzr9r7XU_m-aQkQpRCpc4xz2U',
    },
    nucleus: {
      url: 'http://nucleus.eu-west-1.elasticbeanstalk.com/'
    }
  },
  publicPath: path.join(__dirname, '../server/public'),
  botname: 'Agora Bot',
  talkbot: '@Oui_Agora_Bot',
  image: {
    url: 'http://forum.e-train.fr/album_mod/upload/grandes/495ed81a334a9de8faf80363789f4b03.jpg',
    url_lyon: 'http://www.olivierlegrand.fr/wp-content/uploads/2017/11/lyon.jpg',
    url_marseille: 'http://ekladata.com/V-tdNTaDCemcedjo3mz0TK3hFHc.jpg',
    url_bordeaux: 'http://www.properties-in-charente.com/images/bord.jpg'
  },
  paypalMe:{
    url: 'https://www.paypal.me/'
  }
};