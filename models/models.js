const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Part = sequelize.define('part', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  is_offer: {type: DataTypes.BOOLEAN, allowNull: false},
  offer_id: {type: DataTypes.INTEGER},
  parent_id: {type: DataTypes.INTEGER, allowNull: false},
  is_hidden: {type: DataTypes.BOOLEAN, allowNull: false},
  image_url: {type: DataTypes.STRING, allowNull: false},
  fragment_type: {type: DataTypes.STRING}
})

const Offer = sequelize.define('offer', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  info: {type: DataTypes.TEXT, allowNull: false},
  photos: {type: DataTypes.TEXT, allowNull: false},
  videos: {type: DataTypes.TEXT, allowNull: false},
  hours: {type: DataTypes.TEXT, allowNull: false},
})

// для обновления базы данных
sequelize.sync({alter: true})

module.exports = {
  Part,
  Offer,
}