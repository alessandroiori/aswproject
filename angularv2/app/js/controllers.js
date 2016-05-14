'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('CookBookCtrl', ['$scope', 'AppAdapter',
  function($scope, AppAdapter) {

    AppAdapter.getCookbooks().then(
        function success(response){
          $scope.cookbooks = response.data;
        },function error(response){})

}]);

appControllers.controller('RecipeListCtrl', ['$scope', 'AppAdapter',
  function($scope, AppAdapter) {

    AppAdapter.getRecipes().then(
        function success(response) {
          $scope.recipes = response.data;
        },function error(response){});

}]);


appControllers.controller('RecipeCookBookCtrl', ['$scope', 'AppAdapter','$routeParams',
  function($scope, AppAdapter,$routeParams) {

    AppAdapter.getCookbooks().then(
        function success(response) {
          response.data.forEach(function (cookBook){
            if (cookBook._id == $routeParams.cookBookId){
              $scope.recipes = cookBook.recipes;
            }
          }, function error(response){});
  });

}]);

appControllers.controller('RecipeDetailCtrl', ['$scope', 'AppAdapter', '$routeParams',
  function($scope, AppAdapter, $routeParams) {

    AppAdapter.getRecipes().then(
        function success (response){
          response.data.forEach (function (recipe){
            if(recipe._id == $routeParams.recipeId){
              $scope.recipe = recipe;
            }
          });
        }
        ,function error (response){});
}]);

appControllers.controller('RecipeAddCtrl', ['$scope','AppAdapter',
  function($scope,AppAdapter) {

    AppAdapter.getCookbooks().then(
        function success (response){
            $scope.cookbooks = response.data;
      },function error(response){});

    $scope.newCookbook ={};
    $scope.newRecipe = {
      ingredients: [{
        name: "ing1",
        quantity: "1"
        },
        {
          name: "ing2",
          quantity: "2"
        }
      ],
      steps: [{descr:"passo1"},{descr:"passo2"}],
      name: "ricetta prova",
      tag: ["tag"],
      description: "descr",
      difficulty: "3",
      numberOfPeople: "3",
      cost: "3",
      timeOfSteps: "3"
    };
    console.log($scope.newRecipe)

    //$scope.newRecipe.ingredients = [{}];

    $scope.addNewIngredient = function() {
      $scope.newRecipe.ingredients.push({});
    };

    $scope.removeIngredient = function(index) {
      $scope.newRecipe.ingredients.splice(index,1);
    };
    //$scope.newRecipe.steps = [];

    $scope.addNewStep = function() {
      $scope.newRecipe.steps.push({});

    };

    $scope.removeStep = function(index) {
      $scope.newRecipe.steps.splice(index,1);
    };


    $scope.addRecipe = function (){
      AppAdapter.addRecipe($scope.newRecipe).then(
          function success(response){
            console.log("success")
            $scope.response = response;
          },
          function error(response){
            $scope.response = response;
          })
    }

}]);

appControllers.service("AppAdapter",['$http',function($http){
    var host = "http://localhost:8080"
    this.getCookbooks = function () {
      return $http.get('cookbook.json');
    };
    this.addRecipe = function (newRecipe){
      //trasform steps format to send
      newRecipe.steps.forEach(function (step,index){
        newRecipe.steps[index] = step.descr;
      })
      return $http.post(host+"/recipe",newRecipe);
    };
    this.getRecipes = function (){
      return $http.get('recipes.json')
    };
    this.linkRecipeAtCookbook = function(cookbook,recipe){
      var recipeToLink = {"recipeID":recipe._id}
      return $http.post(host+"/cookbook/"+cookbook_id+"/recipe/link",recipeToLink);
    }
}]);

