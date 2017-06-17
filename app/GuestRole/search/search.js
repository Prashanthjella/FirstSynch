'use strict';

/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("Search", ["ngRoute"]);


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
FirstSynch.controller("searchtutorial" , function ($scope, $http, apiUrl) {

  $http.get(apiUrl+"api/v1/support/tutorials/")
      .then(function successCallback(response){
          $scope.search_tutorial_video = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get search_tutorial");
  });

});
