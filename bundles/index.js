const express = require('express')
const router = express.Router()
const db = require('../models')
const { RETURN_OBJECTS } = require('./utils/enums')

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await db.User.findAll({
    include: [{
      model: db.Schedule
    }]
  })
  console.log('All users with their associated Schedules:', JSON.stringify(users, null, 4))
  res.status(200).send(RETURN_OBJECTS.OK)
})

module.exports = router
