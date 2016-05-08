'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('cookbookCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('cookbooks.json').success(function(data) {
    $scope.cookbooks = data;
  });
}]);

appControllers.controller('RecipeListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('recipes.json').success(function(data) {
    $scope.recipes = data;
  });

}]);

appControllers.controller('RecipeDetailCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.recipeId = $routeParams.recipeId;
}]);

