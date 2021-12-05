const Router = require('express')
const router = new Router()
const encyclopediaRouter = require('./encyclopediaRouter')

router.use('/encyclopedia', encyclopediaRouter)

module.exports = router