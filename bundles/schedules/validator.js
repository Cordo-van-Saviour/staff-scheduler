const { body, param, query } = require('express-validator')
const { VALIDATION_MESSAGES } = require('../utils/errors')

module.exports = {
  readScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID)
  ],
  createScheduleEntry: [
    body('startDate')
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_DATE),
    body('shiftLength')
      .isInt({ max: 24 })
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME),
    body('targetUserId')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_USER_ID)
  ],
  updateScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID),
    body('startDate')
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_DATE)
      .optional(),
    body('shiftLength')
      .isInt({ max: 24 })
      .withMessage(VALIDATION_MESSAGES.INVALID_TIME)
      .optional(),
    body('targetUserId')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_USER_ID)
  ],
  deleteScheduleEntry: [
    param('id')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_ENTRY_ID)
  ],
  readScheduleEntriesForUser: [
    query('userId')
      .isUUID(4)
      .withMessage(VALIDATION_MESSAGES.INVALID_USER_ID)
  ],
  report: [
    body('startDate')
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_DATE),
    body('endDate')
      .isDate()
      .withMessage(VALIDATION_MESSAGES.INVALID_DATE)
  ]
}
