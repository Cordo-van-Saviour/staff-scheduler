'use strict'
const { companies, USER_ROLES } = require('../bundles/utils/enums')
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Schedule, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    company: DataTypes.ENUM(companies),
    password: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM(Object.values(USER_ROLES)),
      defaultValue: 'staff'
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User'
  })
  return User
}
