const express = require('express')
const router = express.Router()
const val = require('../utils/validator.index')
const ctrl = require('./controller')
const { authorized, authenticated, isAdmin, controlId } = require('../utils/auth')

router.post('/', val.schedule.createScheduleEntry, authenticated, ctrl.createScheduleEntry)
router.post('/:id', val.schedule.createScheduleEntry, authenticated, isAdmin, controlId, ctrl.createScheduleEntry)
router.get('/:id', val.schedule.readScheduleEntry, authenticated, ctrl.readScheduleEntryForUser)
router.put('/:id', val.schedule.updateScheduleEntry, authenticated, authorized, controlId, ctrl.updateScheduleEntry)
router.delete('/:id', val.schedule.deleteScheduleEntry, authenticated, authorized, controlId, ctrl.deleteScheduleEntry)

module.exports = router
