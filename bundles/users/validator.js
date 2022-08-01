const { body, param } = require('express-validator')
const { VALIDATION_MESSAGES } = require('../utils/errors')
const { companies } = require('../utils/enums')

module.exports = {
  readUser: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_USER_ID)
  ],
  createUser: [
    body('email')
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.EMPTY_FIELD),
    body('password')
      .isAlphanumeric()
      .isLength({ min: 8, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_PASSWORD),
    body('firstName')
      .isAlphanumeric()
      .isLength({ min: 2, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_NAME),
    body('lastName')
      .isAlphanumeric()
      .isLength({ min: 2, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_NAME),
    body('company')
      .isIn(companies)
      .withMessage(VALIDATION_MESSAGES.INVALID_COMPANY)
  ],
  updateUser: [
    body('email')
      .isEmail()
      .normalizeEmail({ all_lowercase: true })
      .withMessage(VALIDATION_MESSAGES.EMPTY_FIELD)
      .optional(),
    body('firstName')
      .isAlphanumeric()
      .isLength({ min: 2, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_NAME)
      .optional(),
    body('lastName')
      .isAlphanumeric()
      .isLength({ min: 2, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_NAME)
      .optional()
  ],
  deleteUser: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_USER_ID)
  ],
  loginUser: [
    body('email')
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.EMPTY_FIELD),
    body('password')
      .isAlphanumeric()
      .isLength({ min: 8, max: 36 })
      .withMessage(VALIDATION_MESSAGES.INVALID_PASSWORD)
  ]
}
