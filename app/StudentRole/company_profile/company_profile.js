'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("ScompanyProfile", ["ngRoute"]);


/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("student_company_profile" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/"+$routeParams.companyid+"/")
      .then(function successCallback(response){
          $scope.company_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });

});
