'use strict';
/////////////////////////////////// Module ///////////////////////////////////////////

var FirstSynch = angular.module("GemployeeProfile", ["ngRoute"]);


/////////////////////////////////// Configuration ////////////////////////////////////

FirstSynch.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $routeProvider.when('/guest/employee/profile', {
    templateUrl: 'GuestRole/employee_profile/employee_profile.html',
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

  $http.get(apiUrl+"api/v1/user_profile/api/v1/employee_profile/1/")
      .then(function successCallback(response){
          $scope.employee_profile_details = response.data;
      }, function errorCallback(response){
          console.log("Unable to perform get employee profile details");
  });

});