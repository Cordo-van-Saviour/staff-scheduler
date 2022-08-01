const winston = require('winston')
const rTracer = require('cls-rtracer')

const __winston = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new (winston.transports.Console)()
  ]
})

class Logger {
  error (err, meta) {
    __winston.log('error', { err, ...meta, id: rTracer.id() })
  }

  info (message, meta) {
    __winston.log('info', { message, ...meta, id: rTracer.id() })
  }
}

const logger = new Logger()

module.exports.logger = logger
