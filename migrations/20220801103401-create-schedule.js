'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shiftLength: {
        allowNull: false,
        type: Sequelize.INTEGER
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
