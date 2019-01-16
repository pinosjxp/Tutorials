const {Router} = require('express')

module.exports = (router) => {
    let router = router !== undefined ? router : Router()
    return router
}