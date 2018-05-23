const path = require('path');

module.exports = {
  nlp: {
    tock: {
      context: {
        language: "fr",
        clientId: "inno",
        dialogId: "inno",
        clientDevice: "inno",
        referenceTimezone: "Europe/Paris"
      },
      namespace:"vsc",
      appName:"agora-bot",
      url:"http://TOCK.lab-o.io:8888/rest/nlp/parse",
      header:{
        'X-APP-NAMESPACE': 'vsc=az#_1A'
      }
    },
    api: {
      token:'002798ccc57048eab6eb8cac3597f9a1'
    }
  },
  platforms:{
     botframework: {
       id: '10e3ff27-5b1a-43b5-958b-b62e3b06ec57',
       token: 'vgkbmVFH200^=mbAQAT53[+'
     },
    messenger: {
       token:'EAACuB417oB0BAEFIOUZAcGYFi9I2PWzZAkUpZAV7rjZCunQsIGgmRdfhDZA0JryLQpVQmjKjj7bNsf7TfHumeS4Ita7OUxA6KydK4jHaiiDTrOBHi2a30g96vr6AiikmEaJoHLVi93xtXoLWlzBm0zlxZAZCFG5htkkygETC9YLbgZDZD'
    },
    telegram: {
       token:'501507889:AAHzo-Mk7Bdzr9r7XU_m-aQkQpRCpc4xz2U'
    }
  },
  publicPath: path.join(__dirname, '../server/public'),
  talkbot:"@Oui_Agora_Bot"
};