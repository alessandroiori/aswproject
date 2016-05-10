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
      when('/recipes/cookbook/:cookBookId', {
        templateUrl: 'partials/recipe-list.html',
        controller: 'RecipeCookBookCtrl'
      }).
      when('/recipes/add', {
        templateUrl: 'partials/add-recipe.html',
        controller: 'ProvaCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: 'partials/recipe-detail.html',
        controller: 'RecipeDetailCtrl'
      }).
      otherwise({
        redirectTo: '/recipes'
      });
  }]);