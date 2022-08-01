const express = require('express')
const router = express.Router()
const val = require('../utils/validator.index')
const ctrl = require('./controller')
const { authorized, authenticated } = require('../utils/auth')

/* GET users listing. */
router.get('/all', authenticated, authorized, ctrl.readUsers)
router.get('/:id', val.user.readUser, authenticated, authorized, ctrl.readUser)

router.post('/register', val.user.createUser, ctrl.createUser)
router.post('/login', val.user.loginUser, ctrl.login)
router.post('/logout', ctrl.logout)
router.put('/', val.user.updateUser, authenticated, authorized, ctrl.updateUser)
router.put('/:id', val.user.updateUser, authenticated, authorized, ctrl.updateUser)
router.delete('/:id', val.user.deleteUser, ctrl.deleteUser)

module.exports = router
