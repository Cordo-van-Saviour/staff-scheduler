require('dotenv').config()

const { DB_USER, DB_PASS, DB_DATABASE, DB_HOST, DB_DIALECT, DB_PORT } = process.env

module.exports = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  port: DB_PORT,
  host: DB_HOST,
  dialect: DB_DIALECT || 'postgres'
}
