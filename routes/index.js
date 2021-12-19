const Router = require('express')
const router = new Router()
const catalogRouter = require('./catalogRouter')
const offerRouter = require('./offerRouter')
const viewRouter = require('./viewRouter')
const imageRouter = require('./imageRouter')

router.use('/catalog', catalogRouter)
router.use('/offer', offerRouter)
router.use('/view', viewRouter)
router.use('/image', imageRouter)

module.exports = router