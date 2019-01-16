module.exports = (sequelize, DataTypes) => {
    let role = sequelize.define('role', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    role.associate = (role) => {
        //Associations...
    }
    return role
}
  