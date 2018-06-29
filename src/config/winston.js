let appRoot = require('app-root-path');
let winston = require('winston');
const {createLogger, format, transports} = winston;

// define the custom settings for each transport (file, console)
let options = {
  file: {
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
};

const customLevels = {
  levels: {
    error: 0,
    debug: 1,
    info: 2,
  }
}

const alignedWithColorsAndTime = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
);

// instantiate a new Winston Logger with the settings defined above
let logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(),
  ],
  levels: customLevels.levels,
  format: alignedWithColorsAndTime,
  level: 'error',
  exitOnError: false,
  silent: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
  },
};

module.exports = logger;