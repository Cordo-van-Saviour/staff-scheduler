const db = require('../../models')
const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')
const { sign, attachToken, prepareForClient } = require('./util')

async function createUser (req, res) {
// Encrypt user password
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(req.body.password, salt)

  const user = await db.User.create({
    id: v4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: req.body.company,
    email: req.body.email,
    password: encryptedPassword
  })

  // Create token
  const token = await sign(user)
  res = attachToken(res, token)

  return res
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
