'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("GcompanyProfile", ["ngRoute"]);


/////////////////////////////////// Configuration ////////////////////////////////////

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $routeProvider.when('/guest/company/profile', {
    templateUrl: 'GuestRole/company_profile/company_profile.html',
  });
  if(window.history && window.history.pushState){
     //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
     // if you don't wish to set base URL then use this
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    }).hashPrefix('!');
   }
}]);

/////////////////////////////////// controllers ////////////////////////////////////

// company details
FirstSynch.controller("guest_company_profile" ,function ($scope, $http,$routeParams,apiUrl) {

  $http.get(apiUrl+"api/v1/setups/api/v1/company_profile/1/")
      .then(function successCallback(response){
          $scope.company_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get company profile details");
  });

});