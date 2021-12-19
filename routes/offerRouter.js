const Router = require('express')
const router = new Router()
const offerController = require('../controllers/offerController')

router.post("/create", offerController.create)
router.post("/update", offerController.update)
router.post("/remove", offerController.remove)
router.get("/getAll", offerController.getAll)

module.exports = router