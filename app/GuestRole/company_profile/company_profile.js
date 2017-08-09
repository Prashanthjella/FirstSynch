'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("GcompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("guest_company_profile" ,function ($rootScope,$timeout,$window,$scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/"+$routeParams.companyid+"/",{
    headers: {'Authorization' : 'Token '+$rootScope.token_id}
  }).then(function successCallback(response){
          $scope.company_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });
  $scope.$watch('$viewContentLoaded', function(){
      $timeout( function(){
          $window.loading_screen.finish();
     }, 3000 );

  });

});
