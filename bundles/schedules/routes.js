const express = require('express')
const router = express.Router()
const val = require('../utils/validator.index')
const ctrl = require('./controller')
const { authorized, authenticated } = require('../utils/auth')

router.post('/', val.schedule.createScheduleEntry, authenticated, authorized, ctrl.createScheduleEntry)
router.get('/:id', val.schedule.readScheduleEntry, authenticated, authorized, ctrl.readScheduleEntry)
router.put('/:id', val.schedule.updateScheduleEntry, authenticated, authorized, ctrl.updateScheduleEntry)
router.delete('/:id', val.schedule.deleteScheduleEntry, authenticated, authorized, ctrl.deleteScheduleEntry)

module.exports = router
