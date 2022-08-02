const ser = require('./service')
const { prepareForClient, sign, attachToken, clearCookie } = require('./util')
const bcrypt = require('bcryptjs')
const { RETURN_OBJECTS } = require('../utils/enums')

async function readUser (req, res) {
  const data = await ser.readUser(req.params.id)
  res.status(200).send(data)
}

async function readUsers (req, res) {
  const { limit, offset } = req.query
  const users = await ser.readUsers(limit || 10, offset || 0)

  res.status(200).send(users)
}

async function createUser (req, res) {
  const oldUser = await ser.readUserByEmail(req.body.email)

  if (oldUser) {
    return res.status(409).send({ message: 'User Already Exist. Please Login' })
  }

  res = await ser.createUser(req, res)
  res.status(201).json(RETURN_OBJECTS.CREATED)
}

async function login (req, res) {
  const user = await ser.readUserByEmail(req.body.email)
  // okay email
  if (!user) {
    return res.status(400).send(RETURN_OBJECTS.BAD_REQUEST)
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  // okay password
  if (!validPassword) {
    return res.status(400).send(RETURN_OBJECTS.BAD_REQUEST)
  }

  const token = await sign(user)
  res = attachToken(res, token)

  res.status(200).send(RETURN_OBJECTS.OK)
}

async function logout (req, res) {
  res = clearCookie(res)
  res.status(200).send(RETURN_OBJECTS.OK)
}

async function updateUser (req, res) {
  let dbRes = await ser.updateUser(req.verified.id, req.body)

  // first item in the array is the number of rows affected
  dbRes = prepareForClient(dbRes[1][0])

  res.status(200).send(dbRes)
}
async function deleteUser (req, res) {
  const id = req.params.id
  await ser.deleteUser(id)

  res.status(200).send(RETURN_OBJECTS.OK)
}

module.exports = {
  createUser,
  readUser,
  readUsers,
  updateUser,
  deleteUser,
  login,
  logout
}
