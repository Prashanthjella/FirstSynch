'use strict';

/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("Search", ["ngRoute"]);


// search page - recent search
FirstSynch.controller("recentsearch" , function ($rootScope,guest_token,$scope, $http, apiUrl) {
    if (angular.isDefined($rootScope.token_id)) {
      var token_id = $rootScope.token_id;
    } else {
      var token_id = guest_token;
    }
  $http.get(apiUrl+"api/v1/setups/recent_search/", {
        headers: {'Authorization' : 'Token '+token_id}
      }).then(function successCallback(response){
          $scope.search_recent = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get search_help");
  });

});
// search page - popular search_tutorial_video
FirstSynch.controller("popularsearch" , function ($scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/setups/popular_search/")
      .then(function successCallback(response){
          $scope.search_popular = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get search_help");
  });

});
// search page - help
FirstSynch.controller("searchhelp" , function ($scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/support/help/")
      .then(function successCallback(response){
          $scope.search_help = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get search_help");
  });

});

// search page - tutorial
FirstSynch.controller("searchtutorial" , function ($timeout,$window,$scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/support/tutorials/")
      .then(function successCallback(response){
          $scope.search_tutorial_video = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get search_tutorial");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });

});
