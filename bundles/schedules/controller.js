const ser = require('./service')
const { prepareForClient } = require('./util')
const { isAdmin } = require('../utils/misc')

async function readScheduleEntry (req, res) {
  const id = req.params.id

  const data = await ser.readScheduleEntry(id)
  const returnData = prepareForClient(data)

  return res.status(200).send(returnData)
}

async function readScheduleEntryForUser (req, res) {
  const targetId = req.params.id
  const callerId = req.verified.id

  // check if admin first...
  if (!isAdmin(req)) {
    const coworkers = await ser.checkWhetherCoworkers(targetId, callerId)

    // if not admin, then check if users are coworkers
    if (!coworkers) {
      return res.status(403).send({ message: 'Unauthorized' })
    }
  }

  const data = await ser.readScheduleEntriesByUser(targetId)
  const returnData = data.map(prepareForClient)

  return res.status(200).send(returnData)
}

async function createScheduleEntry (req, res) {
  const startTime = req.body.startTime
  const endTime = req.body.endTime

  const collision = await ser.checkCollisionForUser(req.verified.id, startTime, endTime)

  if (collision) {
    return res.status(409).send({ message: 'There is a time collision' })
  }

  const data = await ser.createScheduleEntry(req.verified.id, startTime, endTime)
  const returnData = prepareForClient(data)

  res.status(200).send(returnData)
}

async function updateScheduleEntry (req, res) {
  const body = req.body

  const exists = await ser.checkCollisionForUser(req.params.id, body.startTime, body.endTime)

  if (!exists || !exists.id) {
    return res.status(404).send({ message: 'Not Found' })
  }

  const data = await ser.updateScheduleEntry(exists.id, body.startTime, body.endTime)
  const returnData = prepareForClient(data)

  res.status(200).send(returnData)
}

async function deleteScheduleEntry (req, res) {
  const exists = await ser.readScheduleEntry(req.params.id)

  if (!exists || !exists.id) {
    return res.status(404).send({ message: 'Not Found' })
  }

  const data = await ser.deleteScheduleEntry(exists.id)
  if (data) {
    return res.status(200).send({ message: 'OK' })
  }
}

module.exports = {
  createScheduleEntry,
  readScheduleEntry,
  readScheduleEntryForUser,
  updateScheduleEntry,
  deleteScheduleEntry
}
