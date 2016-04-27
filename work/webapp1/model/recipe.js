var Recipe = require("./model.js").Recipe;

module.exports = {
    getRecipeById: function (id, r) {
        Recipe
            .findOne({
                _id: id
            })
            .exec(r);
    },
    getRecipes: function (rs) {
        Recipe
            .find()
            .exec(rs);
    },
    /*
    deleteRecipeByID: function (id, r) {
        Recipe
            .deleteOne({
                _id: id
            })
            .exec(r);
    },
    removeRecipes: function (rs) {
        Recipe
            .remove()
            .exec(rs);
    },
    */
};