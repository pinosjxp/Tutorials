const {Router} = require('express')
const controller = require('../../controllers/permission')

module.exports = (router) => {
    const prefix = 'permissions'
    let router = router !== undefined ? router : Router()
    //Get all of the resources.
    router.get(`/${prefix}`, async (req, res) => {
        try{
            let data = []
            data = await controller.retrieveAll(req.connection)
            res.json(data)
        }
        catch(e){
            res.status(500).json({
                status: 500,
                message: e
            })
        }
    })
    //Get one of the resources.
    router.get(`/${prefix}/:id`, async (req, res) => {
        try{
            let data = []
            data = await controller.retrieveOne(req.connection)
            res.json(data)
        }
        catch(e){
            res.status(500).json({
                status: 500,
                message: e
            })
        }
    })
    //Create a new resource.
    router.post(`/${prefix}`, async (req, res) => {
        try{
            let data = []
            data = await controller.create(req.connection, req.json)
            res.json(data)
        }
        catch(e){
            res.status(500).json({
                status: 500,
                message: e
            })
        }
    })
    //Edit an existing resource.
    router.put(`/${prefix}/:id`, async (req, res) => {
        try{
            let data = []
            data = await controller.update(req.connection, req.params.id, req.json)
            res.json(data)
        }
        catch(e){
            res.status(500).json({
                status: 500,
                message: e
            })
        }
    })
    //Delete an existing resource.
    router.delete(`/${prefix}/:id`, async (req, res) => {
        try{
            let data = []
            data = await controller.delete(req.connection, req.params.id)
            res.json(data)
        }
        catch(e){
            res.status(500).json({
                status: 500,
                message: e
            })
        }
    })
    //Return the modified router object.
    return router
}