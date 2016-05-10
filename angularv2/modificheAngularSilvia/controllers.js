'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('CookBookCtrl', ['$scope', '$http', 

  function($scope, $http) {
  
      function refreshCookBooks () {
        $http.get('cookbook.json').
          success(function(data) {
            $scope.cookbooks = data;
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


appControllers.controller('ProvaCtrl', function($scope) {

  $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };

  $scope.steps = [{id: 'steps1'}, {id: 'steps2'}];
  
  $scope.addNewStep = function() {
    var newItemNo = $scope.steps.length+1;
    $scope.steps.push({'id':'steps'+newItemNo});
  };
    
  $scope.removeStep = function() {
    var lastItem = $scope.steps.length-1;
    $scope.steps.splice(lastItem);
  };
  
});

