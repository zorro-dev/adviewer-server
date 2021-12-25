const ApiError = require('../error/ApiError')
const {View} = require("../models/models");

class CatalogController {

    async addView(req, res, next) {
        const {list} = req.body

        const l = []

        console.log("add view")
        console.log("list " + list.toString())

        for (let i = 0; i < list.length; i ++) {
            console.log("item_id : " + list[i])

            const item_id = JSON.parse(list[i].toString())["item_id"]
            const type = JSON.parse(JSON.stringify(list[i]))["type"]
            const time = JSON.parse(JSON.stringify(list[i]))["time"]

            console.log("item_id : " + item_id)
            console.log("type : " + type)
            console.log("time : " + time)

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