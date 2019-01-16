module.exports = (sequelize, DataTypes) => {
    let permission = sequelize.define('permission', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    permission.associate = (models) => {
        //Associations...
    }
    return permission
}
  