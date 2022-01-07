const Router = require('express')
const router = new Router()
const slideController = require('../controllers/slideController')

router.post("/create", slideController.create)
router.post("/update", slideController.update)
router.post("/remove", slideController.remove)
router.get("/getActive", slideController.getActive)
router.get("/getAll", slideController.getAll)

module.exports = router