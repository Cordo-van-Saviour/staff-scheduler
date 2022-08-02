require('dotenv').config()

const ser = require('../service')
const { expect, test } = require('@jest/globals')

test('reads the user when id is providedd', async () => {
  expect(await ser.readUser('46639b10-7d40-4bdf-aec2-60a7d560cf7f')).toBeTruthy()
})
