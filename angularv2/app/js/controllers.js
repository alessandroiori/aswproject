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
        //cambiare in cookbook/
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
      // cambiare recipe/id
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
      },function error(response){}
      );
      AppAdapter.getRecipes().then(
          function success (response){
              $scope.recipes = response.data;
              $scope.newRecipe = $scope.recipes[2];
          },function error(response){}
      );
      $scope.newRecipe = {}
      $scope.newCookbook = {
          name:"",
          description:"",
          owener:""
        };

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

      function callAddCookbookAndLinkRecipe(recipe,cookbook){
          AppAdapter.addCookbook(cookbook).then(
              function success(response){
                  if(response.data.status){
                      var cookbookAdded = response.data.cookbook
                      callLinkRecipeAtCookbook(recipe,cookbookAdded);
                  }
                  else $scope.msg = "Errore nell'aggiunta del ricettario "
              },function error(response){}
          )
      }

      function callLinkRecipeAtCookbook (recipe,cookbook){
          AppAdapter.linkRecipeAtCookbook(recipe,cookbook).then(
              function success(response){
                  if (response.data.status){
                      $scope.msg = "Ricetta aggiunta con successo"
                  }
                  else $scope.msg = "Errore nel link ad un ricettario "
              },
              function error(response){}
          )
      }

      $scope.addRecipe = function (){
          var coookbook = {};
          AppAdapter.addRecipe($scope.newRecipe).then(
              function success(response){
                  $scope.response = response;
                  var recipeAdded = response.data;
                  if($scope.cookbookSelected == "newCookbook"){
                      coookbook = $scope.newCookbook;
                      callAddCookbookAndLinkRecipe(recipeAdded,coookbook);
                  }else{
                      coookbook = $scope.cookbookSelected;
                      callLinkRecipeAtCookbook(recipeAdded,coookbook);
                  }
              },
              function error(response){
                  $scope.response = response;
                  $scope.msg = "Errore connessione"
          })
    }

}]);

appControllers.service("AppAdapter",['$http',function($http){
    var host = "http://localhost:8080"

    this.addCookbook = function (newCookbook){
        return $http.post(host+"/cookbook",newCookbook);
    };
    this.getCookbooks = function () {
      return $http.get('cookbook.json');
    };
    this.getCookbook = function(cookbook){
        return $http.get(host+"/cookbook/"+cookbook._id)
    };
    this.addRecipe = function (newRecipe){
      //trasform steps format to send
      newRecipe.steps.forEach(function (step,index){
        newRecipe.steps[index] = step.descr;
      });
      return $http.post(host+"/recipe",newRecipe);
    };
    this.getRecipes = function (){
      return $http.get('recipes.json')
    };
    this.getRecipe = function(recipe){
        return $http.get(host+"/cookbook/"+recipe._id)
    };
    this.linkRecipeAtCookbook = function(recipe,cookbook){
      var recipeToLink = {"recipeID":recipe._id}
      return $http.post(host+"/cookbook/"+cookbook_id+"/recipe/link",recipeToLink);
    };
}]);

