const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')

router.post("/createPart", catalogController.createPart)
//router.post("/updatePart", catalogController.updatePart)
//router.post("/removePart", catalogController.removePart)
router.get("/getAllParts", catalogController.getAllParts)
router.get("/getAllOffers", catalogController.getAllOffers)
//router.get("/:id", catalogController.getCatalog)

module.exports = router