module.exports = (sequelize, DataTypes) => {
    let ingredientType = sequelize.define('ingredient_type', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    ingredientType.associate = (models) => {
        //Associations...
    }
    return ingredientType
}
  