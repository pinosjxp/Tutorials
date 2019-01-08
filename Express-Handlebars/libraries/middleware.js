// A simple function to attach the database connection to express requests.
let databaseHandler = (connection) => {
    return (req, res, next)=>{
        req.connection = connection
        next()
    }
}

module.exports = {
    databaseHandler
}