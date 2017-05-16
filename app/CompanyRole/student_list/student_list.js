'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CStudentList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("company_top_three_students" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/toplist/top3students/")
      .then(function successCallback(response){
          $scope.top_three_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 company details");
  });

});

//studnet page - All studetns
FirstSynch.controller("company_all_studentss" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/user_profile/api/v1/userprofile/")
      .then(function successCallback(response){
          $scope.all_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform student all");
  });

});
/////////////////////////////////// filters ////////////////////////////////////




////////////////////////////////// Directives //////////////////////////////////////
