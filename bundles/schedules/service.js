const db = require('../../models')
const { v4 } = require('uuid')

async function checkCollisionForUser (userId, startDate) {
  return await db.Schedule.findOne({
    where: {
      userId,
      startDate
    }
  })
}

async function readScheduleEntry (id) {
  return await db.Schedule.findOne({
    where: { id }
  })
}

async function readScheduleEntriesByUser (userId) {
  return await db.Schedule.findAll({
    where: { userId }
  })
}

async function readScheduleEntriesByDate (startDay, endDay) {
  return await db.Schedule.findAll({
    where: {
      startDate: {
        [db.Sequelize.Op.gt]: startDay,
        [db.Sequelize.Op.lt]: endDay
      }
    },
    include: ['User']
  })
}

async function createScheduleEntry (userId, startDate, shiftLength) {
  return await db.Schedule.create({
    id: v4(),
    userId,
    startDate,
    shiftLength
  })
}

async function updateScheduleEntry (id, startDate, shiftLength) {
  return await db.Schedule.update({
    startDate,
    shiftLength
  }, {
    where: { id },
    returning: true
  })
}

async function checkWhetherCoworkers (targetId, callerId) {
  // using 2 calls is more performant than one here
  const targetUser = await db.User.findOne({ where: { id: targetId } })
  const callerUser = await db.User.findOne({ where: { id: callerId } })

  if (!targetUser || !callerUser) {
    return false
  }

  return targetUser.company === callerUser.company
}

async function deleteScheduleEntry (id) {
  return await db.Schedule.destroy({ where: { id } })
}

module.exports = {
  checkCollisionForUser,
  createScheduleEntry,
  readScheduleEntry,
  readScheduleEntriesByUser,
  readScheduleEntriesByDate,
  updateScheduleEntry,
  deleteScheduleEntry,
  checkWhetherCoworkers
}
