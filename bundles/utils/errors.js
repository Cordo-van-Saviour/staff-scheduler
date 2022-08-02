const { logger } = require('./logger')
const { sendEmailToTheDeveloper } = require('./misc')

const VALIDATION_MESSAGES = {
  EMPTY_FIELD: 'Please make sure you filled out all fields.',
  USER_DOESNT_EXIST: 'Sorry, but it looks like this user doesn\'t exist.',
  INVALID_PASSWORD: 'Your password doesn\'t meet the requirements',
  INVALID_NAME: 'Your name is invalid',
  INVALID_USER_ID: 'User ID invalid. Please provide a correct UUID',
  INVALID_TIME: 'Your time is invalid.',
  INVALID_ENTRY_ID: 'Your Schedule Entry is invalid.',
  INVALID_COMPANY: 'Your Company is invalid'
}

const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Validation error.'
}

class AppError extends Error {
  constructor (message, slug, statusCode = 500, loggingData = {}, errorCode = undefined) {
    super()
    /** @param {String} */
    this.message = message
    /** @param {String} */
    this.slug = slug
    /** @param {Number} */
    this.statusCode = statusCode
    /** @param {Object} */
    this.loggingData = loggingData
    /** @param {Number} */
    this.errorCode = errorCode
  }
}

class ValidationError extends AppError {
  constructor (errors, message = ERROR_MESSAGES.VALIDATION_ERROR, slug = 'VALIDATION_ERROR', statusCode = 400) {
    super(message, slug, statusCode)
    this.errors = errors
  }
}

class ErrorHandler {
  async handleUserError (err, req, res, next) {
    logger.error(err)

    const data = { message: err.message, slug: err.slug }

    // validation handling
    if (err.errors) {
      data.errors = err.errors
    }

    return res.status(err.statusCode || 500).send(data)
  }

  async handleSystemError (err) {
    logger.error(err)
    await sendEmailToTheDeveloper(err)
    process.exit(0)
  }
}

module.exports = {
  VALIDATION_MESSAGES,
  ERROR_MESSAGES,
  ValidationError,
  ErrorHandler
}
