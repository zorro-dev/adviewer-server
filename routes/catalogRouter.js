const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')

router.post("/create", catalogController.create)
router.post("/update", catalogController.update)
router.post("/remove", catalogController.remove)
router.get("/getAll", catalogController.getAll)

module.exports = router