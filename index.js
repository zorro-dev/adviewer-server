require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const swaggerUI = require("swagger-ui-express");
//const docs = require('./docs');

const PORT = process.env.PORT || 5000

if (process.env.DEBUG) console.log("=============DEBUG MODE===========")
console.log("Connected to Database : " + (process.env.DEBUG ? process.env.DB_NAME_DEBUG : process.env.DB_NAME))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)
//app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

// обработка ошибок последний middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()