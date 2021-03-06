const app = require('../app');
const connector = require('../../setup/chat-connector');
const bot = require('../../setup/bot')(connector);
const winston = require('../../config/winston');

app.post('/botframework/receive', connector.listen());

// Ecoute sur le port définie dans la variable d'environnement PORT ou 3000 par défaut
app.listen(process.env.PORT || 3000, () => {
  winston.info('Agora bot is running !');
});

module.exports = app;