module.exports = (sequelize, DataTypes) => {
    let ingredient = sequelize.define('ingredient', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    ingredient.associate = (models) => {
        //Associations...
    }
    return ingredient
}
  