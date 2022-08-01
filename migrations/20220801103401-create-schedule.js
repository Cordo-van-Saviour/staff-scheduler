'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface) {
    await queryInterface.dropTable('Schedules')
  }
}
