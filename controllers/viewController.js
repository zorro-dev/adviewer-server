const ApiError = require('../error/ApiError')
const {View} = require("../models/models");

class CatalogController {

    async addView(req, res, next) {
        const {list} = req.body

        const l = []

        console.log("add view")

        for (let i = 0; i < list.length; i ++) {
            const { item_id, type, time} = list[i]

            const view = await View.create({item_id, type, time})
            l.push(view)
        }

        return res.json(l)
    }

    async getAll(req, res, next) {
        const items = await View.findAll()
        return res.json(items)
    }

}

module.exports = new CatalogController()