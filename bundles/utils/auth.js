const jwt = require('jsonwebtoken')
const config = require('config')
const { RETURN_OBJECTS, USER_ROLES } = require('./enums')

const authorizationLevel = {
  staff: 1000,
  admin: 2000
}
const tokenHeader = config.get('tokenHeader')

function authenticated (req, res, next) {
  const jwtSecretKey = process.env.TOKEN_KEY
  let token = req.cookies[tokenHeader] ? req.cookies[tokenHeader] : req.headers[tokenHeader.toLowerCase()]

  if (!token) {
    return res.status(401).send(RETURN_OBJECTS.UNAUTHORIZED)
  }

  token = token.split(' ')[1]

  req.verified = jwt.verify(token, jwtSecretKey)

  if (req.verified) {
    next()
  } else {
    // Access Denied
    return res.status(401).send(RETURN_OBJECTS.UNAUTHORIZED)
  }
}

async function authorized (req, res, next) {
  const minimumAuthorizationLevel = req.minimumAuthorizationLevel || 1000
  if (authorizationLevel[req.verified.type] >= minimumAuthorizationLevel) {
    next()
  } else {
    return res.status(401).send(RETURN_OBJECTS.UNAUTHORIZED)
  }
}

function isAdmin (req, res, next) {
  if (req.verified.type === 'admin') {
    req.verified.isAdmin = true
    next()
  } else {
    return res.status(401).send(RETURN_OBJECTS.UNAUTHORIZED)
  }
}

function controlId (req, res, next) {
  req.id = req.params.id

  if (!req.verified.type === USER_ROLES.admin && req.params.id !== req.verified.id) {
    return res.status(403).send(RETURN_OBJECTS.FORBIDDEN)
  }

  next()
}

module.exports = {
  authorized,
  authenticated,
  isAdmin,
  controlId
}
