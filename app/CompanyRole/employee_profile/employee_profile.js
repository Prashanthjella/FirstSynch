'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CemployeeProfile", ["ngRoute"]);

/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("company_employee_profile" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/user_profile/api/v1/employee_profile/1/")
      .then(function successCallback(response){
          $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get employee profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });
});
