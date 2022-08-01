require('dotenv').config()

const { DB_USER, DB_PASS, DB_DATABASE, DB_DIALECT, DB_HOST } = process.env

module.exports = {
  rateLimit: {
    windowMs: 900000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  },
  dbConfig: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  tokenHeader: 'Authorization'
}
