const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res) => {
  res.status(200).send({ message: 'OK' })
})

module.exports = router
