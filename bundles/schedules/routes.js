const express = require('express')
const router = express.Router()
const val = require('../utils/validator.index')
const ctrl = require('./controller')
const { authorized, authenticated } = require('../utils/auth')

router.post('/', val.schedule.createScheduleEntry, ctrl.createScheduleEntry)

router.get('/', authenticated, authorized, ctrl.readUsers)
router.get('/:id', val.user.readUser, authenticated, authorized, ctrl.readUser)

router.post('/login', val.user.loginUser, ctrl.login)
router.post('/logout', ctrl.logout)
router.put('/', val.user.updateUser, authenticated, authorized, ctrl.updateUser)
router.put('/:id', val.user.updateUser, authenticated, authorized, ctrl.updateUser)
router.delete('/:id', val.user.deleteUser, ctrl.deleteUser)

module.exports = router
