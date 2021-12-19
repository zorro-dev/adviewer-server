const {Part} = require('../models/models')
const ApiError = require('../error/ApiError')

class CatalogController {

    async create(req, res, next) {
        const {name, is_offer, offer_id, is_hidden, image_url, fragment_type} = req.body
        let {parent_id} = req.body

        if (!parent_id) parent_id = 0;

        const part = await Part.create({name, parent_id, is_offer, is_hidden, offer_id, image_url, fragment_type})

        return res.json(part)
    }

    async getAll(req, res, next) {
        const parts = await Part.findAll()

        return res.json(parts)
    }

    async update(req, res, next) {
        const {id, name, is_offer, offer_id, is_hidden, image_url, fragment_type} = req.body
        let {parent_id} = req.body

        await Part.update(
            {name, is_offer, offer_id, is_hidden, image_url, fragment_type, parent_id},
            { where: { id } }
        ).catch(err => {
            console.log(err)
        })

        return res.json({message : "ok"});
    }

    async remove(req, res) {
        const {id} = req.body

        const part = await Part.findOne({where : {id}})
        await part.destroy()

        return res.json({message : 'ok'})
    }

}

module.exports = new CatalogController()