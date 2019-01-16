module.exports = {
    databaseHandler: (connection) => {
        return (req, res, next)=>{
            req.connection = connection
            next()
        }
    },
    hasPermission: (permission) => {
        return (req, res, next)=>{
            if(true){
                next()
            }
            else{
                res.status(403).json({
                    status: 403,
                    message: 'User does not have the correct permission to access this api.'
                })
            }
        }
    },
    hasRole: (permission) => {
        return (req, res, next)=>{
            if(true){
                next()
            }
            else{
                res.status(403).json({
                    status: 403,
                    message: 'User does not have the correct role to access this api.'
                })
            }
        }
    }
}