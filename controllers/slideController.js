const {Slide} = require('../models/models')
const ApiError = require('../error/ApiError')

const TYPE_CATALOG = 1;
const TYPE_OFFER = 2;
const TYPE_SLIDE = 3;

const TYPE_SHOW_DAYS = 0;
const TYPE_SHOW_VIEWS = 1;

class SlideController {

    async create(req, res, next) {
        const { type, mode, offer_id, link } = req.body
        let {info} = req.body

        if (type === TYPE_SHOW_DAYS) {
            info = JSON.parse(JSON.stringify(info))
            const days = info.days
            info = {
                date : Date.now() + days * 24 * 60 * 60 * 1000
            }
        }

        const slide = await Slide.create({type, mode, info : JSON.stringify(info), offer_id, link, is_active: true })

        return res.json(slide)
    }

    async getAll(req, res, next) {
        const parts = await Slide.findAll()

        return res.json(parts)
    }

    async getActive(req, res, next) {
        const activeSlides = await Slide.findAll({where: {is_active : true}})

        return res.json(activeSlides)
    }

    async update(req, res, next) {
        const { id, type, mode, offer_id, link } = req.body
        let {info} = req.body

        if (type === TYPE_SHOW_DAYS) {
            info = JSON.parse(JSON.stringify(info))
            const days = info.days
            info = {
                date : Date.now() + days * 24 * 60 * 60 * 1000
            }
        }

        await Slide.update(
            {type, mode, offer_id, info, link, is_active : true},
            { where: { id } }
        ).catch(err => {
            console.log(err)
        })

        return res.json({message : "ok"});
    }

    async remove(req, res) {
        const {id} = req.body

        const slide = await Slide.findOne({where : {id}})
        await slide.destroy()

        return res.json({message : 'ok'})
    }

}

module.exports = new SlideController()