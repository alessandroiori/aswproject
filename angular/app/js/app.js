'use strict';

/* App Module */

var cookbookApp = angular.module('cookbookApp', [
  'ngRoute',
  'appControllers'
]);

cookbookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/recipes', {
        templateUrl: 'partials/recipe-list.html',
        controller: 'RecipeListCtrl'
      }).
      when('/recipes/add', {
        templateUrl: 'partials/add-recipe.html',
        controller: 'RecipeListCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: 'partials/recipe-detail.html',
        controller: 'RecipeDetailCtrl'
      }).
      when('/recipes/add', {
        templateUrl: 'partials/add-recipe.html',
        controller: 'RecipeListCtrl'
      }).
      otherwise({
        redirectTo: '/recipes'
      });
  }]);