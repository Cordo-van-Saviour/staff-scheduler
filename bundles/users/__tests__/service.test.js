require('dotenv').config()

const ser = require('../service')
const { expect, describe, it } = require('@jest/globals')
const { seederUserIds } = require('../../../seeders/consts')
const { companies, USER_ROLES } = require('../../utils/enums')

const mockResponse = () => {
  return {
    query: {},
    headers: {},
    data: null,
    json (payload) {
      this.data = JSON.stringify(payload)
    },
    cookie (name, value) {
      this.headers[name] = value
    }
  }
}

describe('user.service', () => {
  it('reads the user when id is provided', async () => {
    const users = await ser.readUsers()
    expect(users[0]).toEqual({
      // password removed
      firstName: 'Mica',
      company: 'Microsoft',
      email: 'mica@getnada.com',
      id: seederUserIds[0],
      lastName: 'Mecava'
    })
  })
  it('should create a new user when valid data provided', async () => {
    const firstName = 'TestUser'
    const lastName = (Math.floor(Math.random() * 10000) + 1).toString()

    const userData = {
      body: {
        firstName,
        lastName,
        email: `${firstName}.${lastName}@getnada.com`,
        password: 'password',
        company: companies[0],
        type: USER_ROLES.staff
      }
    }
    const data = await ser.createUser(userData.body)
    expect(data).toBeTruthy()
  })
})
