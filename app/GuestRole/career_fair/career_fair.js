'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("careerFair", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

// career fair page - near by career fair
FirstSynch.controller("guest_career_fair_near_user" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?count=10")
      .then(function successCallback(response){
          $scope.career_fair_near_current_user = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get career fair near for current user");
  });

});

// career fair page - near by career fair
FirstSynch.controller("guest_upcoming_career_fair" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/flat_pages/recent_career_fairs/?count=10")
      .then(function successCallback(response){
          $scope.upcoming_career = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get upcoming career fair");
  });

});

// career fair page - near by all career fair
FirstSynch.controller("all_career_fair_near_user" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/career_fairs/career_fair_near_current_user/?count=all&location=Chennai&fields=id,image,start_date,city,state,title")
      .then(function successCallback(response){
          $scope.all_career_fair_near_current_user = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get career fair near for current user");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
