const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ActiveSession extends Model { }

ActiveSession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'active_session'
  }
)

module.exports = ActiveSession


