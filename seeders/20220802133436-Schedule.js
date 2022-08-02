'use strict'

module.exports = {
  up: async (queryInterface) => {
    return await queryInterface.bulkInsert('Schedules', [
      {
        id: '1a28b0c5-9455-46d5-a990-be356bd69c6d',
        userId: 'aef33417-da85-4742-bc1e-fc70d168ef75',
        startDate: '2022-01-15',
        shiftLength: 5,
        createdAt: '2022-08-02T13:16:45.496Z',
        updatedAt: '2022-08-02T13:16:45.496Z'
      },
      {
        id: '87f8e1da-65e8-4914-9bb4-153e474f9224',
        userId: 'aef33417-da85-4742-bc1e-fc70d168ef75',
        startDate: '2022-01-16',
        shiftLength: 6,
        createdAt: '2022-08-02T13:38:03.066Z',
        updatedAt: '2022-08-02T13:38:03.066Z'
      },
      {
        id: 'e49809b2-72a2-48d0-bbfc-24b8d884b1bc',
        userId: 'aef33417-da85-4742-bc1e-fc70d168ef75',
        startDate: '2022-01-17',
        shiftLength: 7,
        createdAt: '2022-08-02T13:38:16.863Z',
        updatedAt: '2022-08-02T13:38:16.863Z'
      }
    ], {})
  },

  down: async (queryInterface) => {
    return await queryInterface.bulkDelete('Schedules', null, {})
  }
}
