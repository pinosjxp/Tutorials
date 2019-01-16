const {Router} = require('express')
const authRoutes = require('./auth')
const maintenanceRoutes = require('./maintenance')
const wwwRoutes = require('./www')

module.exports = (router) => {
    let router = router !== undefined ? router : Router()
    authRoutes(router)
    maintenanceRoutes(router)
    wwwRoutes(router)
    return router
}