const jwt = require('jsonwebtoken')
const config = require('config')
const authorizationLevel = {
  staff: 1000,
  admin: 2000
}
const tokenHeader = config.get('tokenHeader')

function authenticated (req, res, next) {
  const jwtSecretKey = process.env.TOKEN_KEY

  const token = req.cookies[tokenHeader]

  req.verified = jwt.verify(token, jwtSecretKey)

  if (req.verified) {
    next()
  } else {
    // Access Denied
    return res.status(401).send({ message: 'Access Denied' })
  }
}

async function authorized (req, res, next) {
  const minimumAuthorizationLevel = req.minimumAuthorizationLevel || 1000
  if (authorizationLevel[req.verified.type] >= minimumAuthorizationLevel) {
    next()
  } else {
    return res.status(403).send({ message: 'Unauthorized' })
  }
}

function isAdmin (req, res, next) {
  if (req.verified.type === 'admin') {
    req.verified.isAdmin = true
    next()
  } else {
    return res.status(403).send({ message: 'Unauthorized' })
  }
}

function controlId (req, res, next) {
  req.id = req.params.id

  if (!req.verified.isAdmin && req.params.id !== req.verified.id) {
    return res.status(403).send({ message: 'Unauthorized' })
  }

  next()
}

module.exports = {
  authorized,
  authenticated,
  isAdmin,
  controlId
}
