'use strict';

/* App Module */

var cookbookApp = angular.module('cookbookApp', [
  'ngRoute',
  'appControllers'
]);


cookbookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
     when('/recipe', {
        templateUrl: 'partials/recipe-list.html',
        controller: 'RecipeListCtrl'
      }).
    when('/recipe/add', {
        templateUrl: 'partials/add-recipe.html',
        controller: 'RecipeAddCtrl'
    }).
    when('/recipe/:recipeId', {
            templateUrl: 'partials/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        }).
    when('/cookbook/:cookBookId', {
        templateUrl: 'partials/recipe-list.html',
        controller: 'RecipeCookBookCtrl'
      }).
    otherwise({
        redirectTo: '/recipe'
      });
  }]);