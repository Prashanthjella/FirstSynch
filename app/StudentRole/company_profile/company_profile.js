'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("ScompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("student_company_profile" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $scope.student_jobs_notfound = true;
  $http.get(apiUrl+"api/v1/setups/"+$routeParams.companyid+"/",{
    headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
          $scope.student_jobs_notfound = true;
          $scope.company_profile_details = response.data;
      }, function errorCallback(response){
          $scope.student_jobs_notfound = false;
          console.log("Unable to perform get company profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );
  });
});
