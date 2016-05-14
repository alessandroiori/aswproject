'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('CookBookCtrl', ['$scope', '$http',

  function($scope, $http) {
    var cookbooks=""
    this.cookbooks = cookbooks
      function refreshCookBooks () {
        $http.get('cookbook.json').
          success(function(data) {
            $scope.cookbooks = data;
            cookbooks = data;
          })
      }

      refreshCookBooks();

}]);

appControllers.controller('RecipeListCtrl', ['$scope', '$http', 
  function($scope, $http) {
  $http.get('recipes.json').success(function(data) {
    $scope.recipes = data;
  });

}]);


appControllers.controller('RecipeCookBookCtrl', ['$scope', '$http','$routeParams', 
  function($scope, $http,$routeParams) {
    $http.get('cookbook.json').success(function(data) {
      data.forEach(function (cookBook){
        if (cookBook._id == $routeParams.cookBookId){
          $scope.recipes = cookBook.recipes;
        }
      });
  });

}]);

appControllers.controller('RecipeDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('recipes.json').
      then(function success (response){
        console.log("response",response)
            response.data.forEach (function (recipe){
              if(recipe._id == $routeParams.recipeId){
                $scope.recipe = recipe;
              }
            });
          }
          ,function error (response){});
}]);

appControllers.controller('RecipeAddCtrl', ['$scope','HttpDataLoader',
    function($scope,HttpDataLoader) {

      HttpDataLoader.getCookbooks().success(function (data){
        $scope.cookbooks = data;
      });
      
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
        steps: [
          {
            name: "passo1"
          },
          {
            name: "passo2"
          }
        ],
        name: "ricetta prova",
        tag: ["tag"],
        description: "descr",
        difficulty: "3",
        numberOfPeople: "3",
        cost: "3",
        timeOfSteps: "3"
      };

      //$scope.newRecipe.ingredients = [{}];

      $scope.addNewIngredient = function() {
        $scope.newRecipe.ingredients.push({});
      };

      $scope.removeIngredient = function(index) {
        $scope.newRecipe.ingredients.splice(index,1);
      };
      //$scope.newRecipe.steps = [{}];

      $scope.addNewStep = function() {
        $scope.newRecipe.steps.push({});
      };

      $scope.removeStep = function(index) {
        $scope.newRecipe.steps.splice(index,1);
      };

      $scope.printValue = function() {
        $scope.addClicked = true;
        $scope.addRecipe = $scope.newRecipe;
        $scope.addRecipee($scope.newRecipe)
      }

      $scope.addRecipee = function (){
        HttpDataLoader.addRecipe($scope.newRecipe).then(
            function success(response){
              console.log("success")
              $scope.response = response;
            },
            function error(response){
              $scope.response = response;
            })
      }

}]);

appControllers.service("HttpDataLoader",['$http',function($http){
  var host = "http://localhost:8080"
  this.getCookbooks = function () {
    return $http.get('cookbook.json');
  }
  this.addRecipe = function (newRecipe){
    return $http.post(host+"/recipe",newRecipe);
  }
}]);

