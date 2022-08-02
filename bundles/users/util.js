const jwt = require('jsonwebtoken')
const { TOKEN_KEY } = process.env
const config = require('config')

const tokenHeader = config.get('tokenHeader')

function prepareForClient (user) {
  if (!user || user.length === 0 || !user.dataValues) {
    return {}
  }

  user = user.dataValues

  delete user.password
  delete user.type

  delete user.createdAt
  delete user.updatedAt

  return user
}

function sign (user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: user.type,
      company: user.company
    }, TOKEN_KEY, {
      expiresIn: '4h'
    }
  )
}

function attachToken (res, token) {
  return res.cookie(tokenHeader, token)
}

function clearCookie (res) {
  return res.clearCookie(tokenHeader)
}

async function assignAuthorizationLevel (req, authLevel) {
  req.minimumAuthorizationLevel = authLevel

  return req
}

module.exports = {
  prepareForClient,
  sign,
  clearCookie,
  assignAuthorizationLevel,
  attachToken
}
