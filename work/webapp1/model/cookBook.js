var CookBook = require("./model").CookBook; //model.js?

module.exports = {
    getCookBookById: function (id, cb){
        CookBook
            .findOne({
                _id: id
            }) 
            .populate("owner")
            .populate("recipe")
            .exec(cb);
    },
    getCookBooks: function (cb){
        CookBook.find()
                .populate("owner")
                .populate("recipes")
                .exec(cb);
    }
};