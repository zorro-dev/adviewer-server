require('dotenv').config()
const {Sequelize} = require('sequelize')

const isDebug = process.env.DEBUG

const dbName = isDebug ? process.env.DB_NAME_DEBUG : process.env.DB_NAME
const dbUser = isDebug ? process.env.DB_USER_DEBUG : process.env.DB_USER
const dbPassword = isDebug ? process.env.DB_PASSWORD_DEBUG : process.env.DB_PASSWORD

const dbHost = isDebug ? process.env.DB_HOST_DEBUG : process.env.DB_HOST
const dbPort = isDebug ? process.env.DB_PORT_DEBUG : process.env.DB_PORT
const dbDialectOptions = isDebug ?
  null :
  {
    ssl: {
      rejectUnauthorized: false, // very important
    }
  }

module.exports = new Sequelize(
  dbName, dbUser, dbPassword,
  {
    dialect: 'postgres',
    host: dbHost,
    port: dbPort,
    dialectOptions: dbDialectOptions
  },
)