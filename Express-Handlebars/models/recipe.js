module.exports = (sequelize, DataTypes) => {
    let recipe = sequelize.define('recipe', {
        //Attributes...
    }, {
        //Configurations...
    })
  
    recipe.associate = (models) => {
        //Associations...
    }
    return recipe
}
  