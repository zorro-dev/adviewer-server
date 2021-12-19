const uuid = require('uuid')
const ApiError = require('../error/ApiError')
const {Image} = require("../models/models");
const path = require("path")

class CatalogController {

    async add(req, res, next) {
        const { image } = req.files

        const filename = uuid.v4() + ".jpg";

        const item = await Image.create({url : filename})

        image.mv(path.resolve(__dirname, "..", "static", filename))

        return res.json(item)
    }

    async getAll(req, res, next) {
        const items = await Image.findAll()
        return res.json(items)
    }

}

module.exports = new CatalogController()