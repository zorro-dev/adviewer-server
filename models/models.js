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

const Image = sequelize.define('image', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.TEXT, allowNull: false},
})

const View = sequelize.define('view', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  item_id: {type: DataTypes.INTEGER, allowNull: false},
  type: {type: DataTypes.INTEGER, allowNull: false},
  time: {type: DataTypes.BIGINT, allowNull: false},
})

const Slide = sequelize.define('slide', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  type: {type: DataTypes.INTEGER, allowNull: false},
  mode: {type: DataTypes.INTEGER, allowNull: false},
  link: {type: DataTypes.STRING, allowNull: false},
  offer_id: {type: DataTypes.INTEGER},
  is_active: {type: DataTypes.BOOLEAN, allowNull: false},
  info: {type: DataTypes.STRING, allowNull: false},
})

// для обновления базы данных
sequelize.sync({alter: true})

module.exports = {
  Part,
  Offer,
  Image,
  View,
  Slide
}