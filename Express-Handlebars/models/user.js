module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define('user', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    user.associate = (models) => {
        //Associations
    }
    return user
}
  