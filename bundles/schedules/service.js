const db = require('../../models')

async function checkCollisionForUser (userId, startTime, endTime) {
  return await db.Schedule.count({
    where: {
      userId,
      startTime: {
        [db.Sequelize.Op.gt]: startTime
      },
      endTime: {
        [db.Sequelize.Op.lt]: endTime
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
  deleteScheduleEntry
}
