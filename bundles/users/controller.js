const ser = require('./service')
const { prepareForClient, sign, attachToken, clearCookie } = require('./util')

async function readUser (req, res) {
  const data = ser.readUser(req.params.id)
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
  res.status(201).json({ message: 'OK' })
}

async function login (req, res) {
  const user = await ser.readUserByEmail(req.body.email)
  const token = await sign(user)
  res = attachToken(res, token)

  res.status(200).send({ message: 'OK' })
}

async function logout (req, res) {
  res = clearCookie(res)
  res.status(200).send({ message: 'OK' })
}

async function updateUserAdmin (req, res) {
  const dbRes = await ser.updateUser(req.body)
  res.status(200).send(dbRes)
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

  res.status(200).send({ message: 'OK' })
}

module.exports = {
  createUser,
  readUser,
  readUsers,
  updateUser,
  updateUserAdmin,
  deleteUser,
  login,
  logout
}
