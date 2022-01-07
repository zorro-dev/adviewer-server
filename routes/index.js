const Router = require('express')
const router = new Router()
const catalogRouter = require('./catalogRouter')
const offerRouter = require('./offerRouter')
const viewRouter = require('./viewRouter')
const imageRouter = require('./imageRouter')
const slideRouter = require('./slideRouter')

router.use('/catalog', catalogRouter)
router.use('/offer', offerRouter)
router.use('/view', viewRouter)
router.use('/image', imageRouter)
router.use('/slide', slideRouter)

module.exports = router