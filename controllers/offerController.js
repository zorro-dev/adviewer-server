const {Part, ContentPart} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Offer} = require("../models/models");

class CatalogController {

    async create(req, res, next) {
        const {part_id} = req.body
        const {info, photos, videos, hours} = req.body

        const offer = await Offer.create({ info, photos, videos, hours })
        await Part.update({offer_id: offer.id}, {where:{id : part_id}})

        return res.json(offer)
    }

    async getAll(req, res, next) {
        const offers = await Offer.findAll()
        return res.json(offers)
    }

    async update(req, res, next) {
        const { id } = req.body
        const { info, photos, videos, hours } = req.body

        await Offer.update(
            { info, photos, videos, hours },
            { where: { id: id } }
        ).catch(err => {
            console.log(err)
        })

        return res.json({message : "ok"});
    }

    async remove(req, res) {
        const {id} = req.body

        const offer = await Offer.findOne({where : {id}})
        await offer.destroy()

        return res.json({message : 'ok'})
    }

}

module.exports = new CatalogController()