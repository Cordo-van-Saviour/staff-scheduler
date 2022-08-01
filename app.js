require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const config = require('config')

// security
const helmet = require('helmet')
const { rateLimit } = require('express-rate-limit')

// logging
const rTracer = require('cls-rtracer')

const usersRouter = require('./bundles/users/routes')
const scheduleRouter = require('./bundles/schedules/routes')
const indexRouter = require('./bundles/index')

const { ErrorHandler } = require('./bundles/utils/errors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// security
app.use(helmet())
app.use(rTracer.expressMiddleware())
const rateLimitConfig = config.get('rateLimit')
const limiter = rateLimit(rateLimitConfig)
app.use(limiter)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/schedules', scheduleRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

const errorHandler = new ErrorHandler()

// error handler
app.use(errorHandler.handleUserError)

process.on('uncaughtException', error => {
  errorHandler.handleSystemError(error)
})

process.on('unhandledRejection', reason => {
  errorHandler.handleSystemError(reason)
})

module.exports = app
