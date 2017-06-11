'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("StudentList", ["ngRoute"]);



/////////////////////////////////// Controllors ////////////////////////////////////

//student page - top 3 details
FirstSynch.controller("top_three_students" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/toplist/top3students/")
      .then(function successCallback(response){
          $scope.top_three_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get top 3 student details");
  });

});

//studnet page - All studetns
FirstSynch.controller("all_studentss" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_list/")
      .then(function successCallback(response){
          $scope.all_student = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform student all");
  });

});
/////////////////////////////////// filters ////////////////////////////////////

//student page - student category
FirstSynch.controller("student_category" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/student/api/v1/student_categories/")
      .then(function successCallback(response){
          $scope.student_cate = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get student details as category wise");
  });

});


////////////////////////////////// Directives //////////////////////////////////////
