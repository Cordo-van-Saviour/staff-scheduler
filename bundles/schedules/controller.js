const ser = require('./service')
const { prepareForClient } = require('./util')
const { RETURN_OBJECTS } = require('../utils/enums')
const { isAdmin } = require('../utils/misc')
const dayjs = require('dayjs')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)

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
      return res.status(403).send(RETURN_OBJECTS.FORBIDDEN)
    }
  }

  const data = await ser.readScheduleEntriesByUser(targetId)
  const returnData = data.map(prepareForClient)

  return res.status(200).send(returnData)
}

async function createScheduleEntry (req, res) {
  const startDate = req.body.startDate
  const shiftLength = req.body.shiftLength
  const targetUserId = req.body.targetUserId

  if (!isAdmin(req)) {
    if (targetUserId !== req.verified.id) {
      return res.status(403).send(RETURN_OBJECTS.FORBIDDEN)
    }
  }

  if (dayjs(startDate).isSameOrBefore(dayjs())) {
    return res.status(409).send({ message: 'You can\'t schedule a shift in the past' })
  }

  const aYearFromNow = dayjs().add(1, 'y')

  if (dayjs(startDate).isSameOrAfter(aYearFromNow)) {
    return res.status(409).send({ message: 'You can\'t schedule a shift more than a year from now' })
  }

  const collision = await ser.checkCollisionForUser(targetUserId, startDate)

  if (collision) {
    return res.status(409).send({ message: 'There is a time collision' })
  }

  const data = await ser.createScheduleEntry(targetUserId, startDate, shiftLength)
  const returnData = prepareForClient(data)

  res.status(200).send(returnData)
}

async function updateScheduleEntry (req, res) {
  const startDate = req.body.startDate
  const shiftLength = req.body.shiftLength
  const targetUserId = req.body.targetUserId
  const targetId = req.params.id

  if (!isAdmin(req)) {
    if (targetUserId !== req.verified.id) {
      return res.status(403).send(RETURN_OBJECTS.FORBIDDEN)
    }
  }

  if (dayjs(startDate).isSameOrBefore(dayjs())) {
    return res.status(400).send({ message: 'You can\'t schedule a shift in the past' })
  }

  const aYearFromNow = dayjs().add(1, 'y')

  if (dayjs(startDate).isSameOrAfter(aYearFromNow)) {
    return res.status(400).send({ message: 'You can\'t schedule a shift more than a year from now' })
  }

  const targetScheduleEntry = await ser.readScheduleEntry(targetId)

  if (!targetScheduleEntry) {
    return res.status(400).send(RETURN_OBJECTS.BAD_REQUEST)
  }

  const data = await ser.updateScheduleEntry(targetId, startDate, shiftLength)
  const returnData = prepareForClient(data[1][0])

  return res.status(200).send(returnData)
}

async function deleteScheduleEntry (req, res) {
  const exists = await ser.readScheduleEntry(req.params.id)

  if (!exists || !exists.id) {
    return res.status(400).send(RETURN_OBJECTS.BAD_REQUEST)
  }

  if (!isAdmin(req) && req.verified.id !== exists.userId) {
    return res.status(403).send(RETURN_OBJECTS.FORBIDDEN)
  }

  const data = await ser.deleteScheduleEntry(exists.id)
  if (data) {
    return res.status(200).send(RETURN_OBJECTS.OK)
  }
}

async function report (req, res) {
  const { startDate, endDate } = req.body
  const diff = dayjs(endDate).diff(startDate, 'y')

  if (diff > 0) {
    return res.status(400).send({ message: 'You can\'t order a report more than a year apart' })
  }

  const data = await ser.readScheduleEntriesByDate(startDate, endDate)

  // we have a  point in our task saying:
  // ○ Admin can order users list by accumulated work hours per arbitrary period (up to 1 year).
  //
  // now we have 2 approaches
  // one is to consider "order" as a REQUEST, as in "Jane order the food"
  //
  // another is to consider "order" as a structuring method - "put this in order"
  // so we'll do the method with lower time complexity
  const requestedData = {}
  data.forEach(scheduleEntry => {
    if (!requestedData[scheduleEntry.User.email]) {
      requestedData[scheduleEntry.User.email] = 0
    }
    requestedData[scheduleEntry.User.email] += scheduleEntry.shiftLength
  })

  // TODO@Urk: we are including User with every scheduleEntry
  //  We can adjust this API to return data in another format

  return res.status(200).send(requestedData)
}

module.exports = {
  createScheduleEntry,
  readScheduleEntry,
  readScheduleEntryForUser,
  updateScheduleEntry,
  deleteScheduleEntry,
  report
}
