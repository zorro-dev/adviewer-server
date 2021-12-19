const ApiError = require('../error/ApiError')
const {View} = require("../models/models");

class CatalogController {

    async addView(req, res, next) {
        const { item_id, type } = req.body

        let view = await View.findOne({where: {item_id, type}})

        if (!view) view = await View.create({item_id, type, views : 0})

        let views = view.views;

        await View.update({views}, {where: {item_id, type}})

        return res.json(view)
    }

    async getAll(req, res, next) {
        const items = await View.findAll()
        return res.json(items)
    }

}

module.exports = new CatalogController()