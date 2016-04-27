var router = require("express").Router();
var recipe = require("../model/recipe"); // recipe.js?

router.get("/", function (req, res) {
    recipe.getRecipes(function (err, recipes) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipes: recipes,
        })
    });
});

router.post("/", function (req, res) {
    // Add recipe
});

router.get("/:id", function (req, res) {
    recipe.getRecipeById(req.params.id, function (err, recipe) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipe: recipe,
        });
    });
});

router.put("/:id", function (req, res) {
    // Update recipe
});

router.delete("/:id", function (req, res) {
    // Delete recipe
    /*
    recipe.deleteRecipeByID(req.params.id, function (err, recipe) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipe: recipe,
        });
    });
    */
});

module.exports = router;