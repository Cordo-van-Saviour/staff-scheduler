const db = require('../../models')
const { v4 } = require('uuid')
const { prepareForClient } = require('./util')

async function createUser (body) {
  return await db.User.create({
    id: v4(),
    firstName: body.firstName,
    lastName: body.lastName,
    company: body.company,
    email: body.email,
    password: body.password
  })
}

async function readUser (id) {
  const user = await db.User.findOne({ where: { id } })
  return prepareForClient(user)
}

async function readUserByEmail (email) {
  return await db.User.findOne({ where: { email } })
}

async function readUsers (limit = 10, offset = 0) {
  const users = await db.User.findAll({ limit, offset })
  return users.map(prepareForClient)
}

async function updateUser (id, body) {
  return await db.User.update({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email
  }, {
    where: { id },
    returning: true
  })
}

async function deleteUser (id) {
  return await db.User.destroy({ where: { id } })
}

module.exports = {
  createUser,
  readUser,
  readUsers,
  readUserByEmail,
  updateUser,
  deleteUser
}
