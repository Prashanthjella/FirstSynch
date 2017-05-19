'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("SemployeeProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("student_employee_profile" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/user_profile/api/v1/employee_profile/1/")
      .then(function successCallback(response){
          $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get employee profile details");
  });

});