var mongoose = require('mongoose');
var config = require("../package.json").config;

mongoose.connect(config.mongoose);

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    tag: [{
        type: String
    }],
    ingredients: [{
        name: String,
        quantity: String,
        /*
        quantity: [{
            value: Number,
            unit_of_value: String,
        }],
        */
    }],
    steps: [{
        type: String
    }],
    difficulty: Number,
    cost: Number,
    timeOfSteps: Number,
    numberOfPeople: Number,
    dataCreation: {
        type: Date,
        default: Date.now
    },
});

var userSchema = new mongoose.Schema({
   name: String
});

var cookBookSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Recipe: mongoose.model("Recipe", recipeSchema),
    CookBook: mongoose.model("CookBook", cookBookSchema), //CookBook?
    support: {
        toObjctedId: function (id){
            return mongoose.Types.ObjectId(id);
        }
    }
}