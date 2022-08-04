const ser = require('../users/service')

function prepareForClient (schedule) {
  if (!schedule || schedule.length === 0 || !schedule.dataValues) {
    return {}
  }

  schedule = schedule.dataValues

  delete schedule.createdAt
  delete schedule.updatedAt

  return schedule
}

async function checkWhetherCoworkers (targetId, callerId) {
  // using 2 calls is more performant than one here
  const targetUser = await ser.readUser(targetId)
  const callerUser = await ser.readUser(callerId)

  if (!targetUser || !callerUser) {
    return false
  }

  return targetUser.company === callerUser.company
}

module.exports = { prepareForClient, checkWhetherCoworkers }
