module.exports = (sequelize, DataTypes) => {
    let groceryList = sequelize.define('grocery_list', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    groceryList.associate = (models) => {
        //Associations...
    }
    return groceryList
}
  