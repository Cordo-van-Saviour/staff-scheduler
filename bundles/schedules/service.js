const db = require('../../models')
const { v4 } = require('uuid')

async function checkCollisionForUser (userId, startTime, endTime) {
  return await db.Schedule.findOne({
    where: {
      userId,
      [db.Sequelize.Op.and]: {
        startTime: {
          [db.Sequelize.Op.between]: [startTime, endTime]
        }
      },
      [db.Sequelize.Op.or]: {
        endTime: {
          [db.Sequelize.Op.between]: [startTime, endTime]
        }
      }
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

async function readScheduleEntriesByDate (startTime, endTime) {
  return await db.Schedule.findAll({
    where: {
      startTime: {
        [db.Sequelize.Op.gt]: startTime
      },
      endTime: {
        [db.Sequelize.Op.lt]: endTime
      }
    }
  })
}

async function createScheduleEntry (userId, startTime, endTime) {
  return await db.Schedule.create({
    id: v4(),
    userId,
    startTime,
    endTime
  })
}

async function updateScheduleEntry (id, startTime, endTime) {
  return await db.Schedule.update({
    startTime,
    endTime
  }, {
    where: { id }
  })
}

async function checkWhetherCoworkers (targetId, callerId) {
  // using 2 calls is more performant than one here
  const targetUser = await db.User.findOne({ where: { id: targetId } })
  const callerUser = await db.User.findOne({ where: { id: callerId } })

  if (!targetUser || !callerUser) {
    return false
  }

  if (targetUser.company !== callerUser.company) {
    return false
  }

  return true
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
