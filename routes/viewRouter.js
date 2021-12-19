const Router = require('express')
const router = new Router()
const viewController = require('../controllers/viewController')

router.post("/addView", viewController.addView)
router.get("/getAll", viewController.getAll)

module.exports = router