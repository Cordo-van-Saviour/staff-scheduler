function prepareForClient (schedule) {
  if (!schedule || schedule.length === 0 || !schedule.dataValues) {
    return {}
  }

  schedule = schedule.dataValues

  delete schedule.createdAt
  delete schedule.updatedAt

  return schedule
}

module.exports = { prepareForClient }
