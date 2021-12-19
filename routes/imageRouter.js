const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')

router.post("/add", imageController.add)
router.post("/remove", imageController.remove)
router.get("/getAll", imageController.getAll)

module.exports = router