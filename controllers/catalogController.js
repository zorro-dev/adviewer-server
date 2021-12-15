const {Part, ContentPart} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Offer} = require("../models/models");

class CatalogController {

    async createPart(req, res, next) {
        const {name, is_offer, offer_id, is_hidden, image_url, fragment_type} = req.body
        let {parent_id} = req.body

        if (!parent_id) parent_id = 1;

        const part = await Part.create({name, parent_id, is_offer, is_hidden, offer_id, image_url, fragment_type})

        return res.json(part)
    }

    async createOffer(req, res, next) {
        const {part_id} = req.body
        const {info, photos, videos, hours} = req.body

        const offer = await Offer.create({ info, photos, videos, hours })
        await Part.update({offer_id: offer.id}, {where:{id : part_id}})

        return res.json(offer)
    }

    async getCatalog(req, res, next) {
        const {id} = req.params

        const parts = await Part.findAll({where : {parent_id : id}})

        return res.json({
            parts
        })
    }

    async getAllParts(req, res, next) {
        const parts = await Part.findAll()

        return res.json(parts)
    }

    async getAllOffers(req, res, next) {
        const offers = await Offer.findAll()

        return res.json(offers)
    }

    async updatePart(req, res, next) {
        const {part} = req.body
        const validationError = validatePart(part);
        if (!part && !validationError) return next(ApiError.INVALID_UPDATE_PART(validationError))

        console.log(part.id)
        console.log(part.name)
        console.log(part.icon_url)
        console.log(part.version)
        console.log(part.is_hidden)
        console.log(part.is_article)
        console.log(part.article_id)
        console.log(part.fragment_type)

        await Part.update(
            {name : part.name,
                icon_url: part.icon_url, version: part.version,
                is_hidden: part.is_hidden, is_article: part.is_article,
                fragment_type: part.fragment_type, article_id: part.article_id},
            { where: { id: part.id } }
        ).catch(err => {
            //res.send()
            console.log(err)
        })

        return res.json({message : "ok"});
    }

    async removePart(req, res) {
        const {id} = req.body

        await removePartRecursive(id)

        return res.json({message : 'ok'})
    }

    async getOne(req, res) {
        return res.json({message : "ok"});
    }

}

function validatePart(part) {
    if (!part || part.id || part.id.length === 0) return "id"
    if (!part || part.name || part.name.length === 0) return "name"
    if (!part || part.icon_url || part.icon_url.length === 0) return "icon_url"
    if (!part || part.version || part.version=== undefined) return "version"
    if (!part || part.is_hidden || part.is_hidden.length === 0) return "is_hidden"
    if (!part || part.is_article || part.is_article=== undefined) return "is_article"
    if (!part || part.fragment_type || part.fragment_type.length === 0) return "fragment_type"
    if (!part || part.article_id || part.article_id.length === 0) return "article_id"

    return undefined
}

async function removePartRecursive(id) {
    let mainPart = await Part.findOne({where : {id}})

    const parts = await ContentPart.findAll({where : {parent : mainPart.id}})
    const contentPart = await ContentPart.findOne({where : {child : id}})

    for (let i = 0; i < parts.length; i ++) {
        let part = await Part.findOne({where:{id : parts[i].child}});
        const partId = part.id

        if (!part.is_article) {
            await removePartRecursive(partId)
        }

        await part.destroy()
        await parts[i].destroy()
    }

    await mainPart.destroy()
    await contentPart.destroy()

    return mainPart
}

async function getPartById(id) {
    let mainPart = await Part.findOne({where : {id}})

    const parts = await ContentPart.findAll({where : {parent : mainPart.id}})
    const contentPart = await ContentPart.findOne({where : {child : id}})

    const partList = []

    for (let i = 0; i < parts.length; i ++) {
        console.log("part child : " + parts[i].child)
        let part = await Part.findOne({where:{id : parts[i].child}});

        if (!part) continue
        part = part.toJSON()

        delete part.updatedAt
        delete part.createdAt

        part.parent_id = id

        if (part.is_article) {
            partList.push(part)
        } else {
            partList.push(await getPartById(part.id))
        }
    }

    mainPart = mainPart.toJSON()

    mainPart.parent_id = contentPart ? contentPart.parent : 1

    mainPart.parts = partList

    delete mainPart.updatedAt
    delete mainPart.createdAt

    return mainPart
}

async function getMainParts() {
    let mainPart = await Part.findOne({where : {id : 1}})

    const parts = await ContentPart.findAll({where : {parent : mainPart.id}})

    const partList = []

    for (let i = 0; i < parts.length; i ++) {
        let part = await Part.findOne({where:{id : parts[i].child}});

        if (!part) continue

        part = part.toJSON()
        delete part.updatedAt
        delete part.createdAt

        partList.push(part)
    }

    return partList
}

module.exports = new CatalogController()