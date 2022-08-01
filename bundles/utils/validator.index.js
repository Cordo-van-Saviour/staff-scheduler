const { validationResult } = require('express-validator')

const user = require('../users/validator')
const schedule = require('../schedules/validator')

const { ValidationError } = require('./errors')

function appendValidationError (validators) {
  const newValidators = {}

  Object.keys(validators).map(valName => (newValidators[valName] = [validators[valName], validationErrorHandler]))

  return newValidators
}

function validationErrorHandler (req, res, next) {
  const result = validationResult(req)
  const errors = result.mapped()

  if (!result.isEmpty()) {
    const validationFields = Object.keys(errors)
    const firstErrorMessage = errors[validationFields[0]].msg
    throw new ValidationError(errors, firstErrorMessage)
  } else {
    next()
  }
}

module.exports = {
  user: appendValidationError(user),
  schedule: appendValidationError(schedule)
}
