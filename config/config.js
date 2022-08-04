require('dotenv').config({ path: `${process.cwd()}/.env` })

module.exports = {
  development: {
    use_env_variable: 'DB_URI_DEVELOPMENT',
    dialect: process.env.DB_DIALECT
  },
  docker: {
    use_env_variable: 'DB_URI_DOCKER',
    dialect: process.env.DB_DIALECT
  },
  test: {
    use_env_variable: 'DB_URI_TEST',
    logging: false
  },
  production: {
    use_env_variable: 'DB_URI',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
