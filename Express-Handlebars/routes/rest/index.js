const {Router} = require('express')
const groceryListRoutes = require('./grocery-list')
const ingredientTypeRoutes = require('./ingredient-type')
const ingredientRoutes = require('./ingredient')
const permissionRoutes = require('./permission')
const recipeRoutes = require('./recipe')
const roleRoutes = require('./role')
const userRoutes = require('./user')

module.exports = (router) => {
    let router = router !== undefined ? router : Router()
    groceryListRoutes(router)
    ingredientTypeRoutes(router)
    ingredientRoutes(router)
    permissionRoutes(router)
    recipeRoutes(router)
    roleRoutes(router)
    userRoutes(router)
    return router
}