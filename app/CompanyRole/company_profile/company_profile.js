'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("CcompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("company_company_profile" ,function ($scope, $http,$routeParams,apiUrl) {
  $http.get(apiUrl+"api/v1/setups/api/v1/company/"+$routeParams.comid+"/")
      .then(function successCallback(response){
          $scope.com_company_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });

});
