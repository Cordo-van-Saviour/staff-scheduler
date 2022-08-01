const { body, param } = require('express-validator')
const { VALIDATION_MESSAGES } = require('../utils/errors')

module.exports = {
  readScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID)
  ],
  createScheduleEntry: [
    body('startTime')
      .isNumeric()
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME),
    body('endTime')
      .isNumeric()
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME)
  ],
  updateScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID),
    body('startTime')
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME)
      .optional(),
    body('endTime')
      .isAlphanumeric()
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME)
      .optional()
  ],
  deleteScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID)
  ]
}
