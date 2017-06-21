'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CcompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("company_company_profile" ,function ($timeout,$window,$scope, $http,$routeParams,apiUrl) {
  $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$routeParams.comid+"/")
      .then(function successCallback(response){
          $scope.company_profile_details = response.data[0];
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });
});
