var router = require("express").Router();
var cookBook = require("../model/cookBook"); //coockBook.js?

router.get("/", function (req, res){
    cookBook.getCookBooks(function (err, cookBooks){
       if (err) {
           return res.status(500).json({
               status: false,
               error: err
           });
       }
        
        res.json({
            status: true,
            cookBooks: cookBooks
        })
    });
});

router.post("/", function (req, res){

});

router.get("/:id", function (req, res){
    cookBook.getCookBookById(req.params.id, function (err, cookBook) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                error: err
            });
        }

        res.json({
            status: true,
            cookBook: cookBook
        })
    });
});

router.put("/:id", function (req, res){

});

router.delete("/:id", function (req, res){

});

router.get("/:id/recipe", function (req, res){

});

/**
 * Inserimento dentro il ricettario di una ricetta
 */
router.post("/:id/recipe", function (req, res){
    var recipeID = req.body.recipeID;
    var id = req.params.id;
});

/**
 * Rimozione di una ricetta dal ricettario
 */
router.delete("/:id/recipe", function (req, res){
    var recipeID = req.body.recipeID;
    var id = req.params.id;
});


module.exports = router;