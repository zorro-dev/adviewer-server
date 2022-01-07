const ApiError = require('../error/ApiError')
const {View, Slide} = require("../models/models");

const TYPE_CATALOG = 1;
const TYPE_OFFER = 2;
const TYPE_SLIDE = 3;

const TYPE_SHOW_DAYS = 0;
const TYPE_SHOW_VIEWS = 1;

class CatalogController {

    async addView(req, res, next) {
        let {list} = req.body

        const l = []

        console.log("list : " + list.toString())

        list = JSON.parse(list)

        for (let i = 0; i < list.length; i ++) {
            const {item_id, type, time} = list[i]

            const view = await View.create({item_id, type, time})
            l.push(view)
        }

        const slides = await Slide.findAll()

        for (let i = 0; i < slides.length;  i ++) {
            const slide = JSON.parse(JSON.stringify(slides[i]))
            if (!slide.is_active) continue

            console.log("slide id : " + slide.id)

            if (slide.type === TYPE_SHOW_DAYS) {

                const endpointDate = Date.now()
                const slideDate = JSON.parse(slide.info)["date"]

                console.log("endpoint date : " + endpointDate)
                console.log("slide date    : " + slideDate)
                console.log("different : " + (slideDate - endpointDate))

                if (slideDate <= endpointDate) {
                    console.log("slide disable")
                    await Slide.update(
                      {is_active: false},
                      { where: { id : slide.id } }
                    ).catch(err => {
                        console.log(err)
                    })
                }
            } else if (slide.type === TYPE_SHOW_VIEWS){
                const items = await View.findAll({where : {type : TYPE_SLIDE, item_id : slide.id}})

                const slideMaxViews = JSON.parse(slide.info)["views"];

                console.log("database views count : " + items.length)
                console.log("slide info : " + slide.info)
                console.log("slide max views count : " + slideMaxViews)

                if (items.length >= slideMaxViews) {
                    console.log("slide disable")
                    await Slide.update(
                      {is_active: false},
                      { where: { id : slide.id } }
                    ).catch(err => {
                        console.log(err)
                    })
                }

            }
        }

        return res.json(l)
    }

    async getAll(req, res, next) {
        const items = await View.findAll()
        return res.json(items)
    }
}



module.exports = new CatalogController()