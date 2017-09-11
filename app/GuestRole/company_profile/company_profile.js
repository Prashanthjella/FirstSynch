'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("GcompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("guest_company_profile" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {
    $scope.guest_jobs_notfound = true;
    $http.get(apiUrl+"api/v1/setups/"+$routeParams.companyid+"/",{
        headers: {'Authorization' : 'Token '+$rootScope.token_id}
    }).then(function successCallback(response){
          $scope.company_profile_details = response.data;
          $scope.guest_jobs_notfound = true;
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
          $scope.guest_jobs_notfound = false;
    });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });

});
